const express = require('express');
const db = require('../db');

const router = express.Router();
const priorities = ['high', 'medium', 'low'];
const statuses = ['all', 'done', 'pending'];

function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateTask(body) {
  const errors = {};
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    body = {};
    errors.body = 'Dữ liệu phải là một đối tượng JSON.';
  }
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const dueDate = body.due_date === '' ? null : body.due_date;
  const priority = body.priority || 'medium';
  const category = body.category === undefined ? '' : body.category;

  if (!title) errors.title = 'Tiêu đề là bắt buộc.';
  else if (title.length > 200) errors.title = 'Tiêu đề không được vượt quá 200 ký tự.';
  if (dueDate !== null && !isValidDate(dueDate)) {
    errors.due_date = 'Ngày đến hạn phải có định dạng YYYY-MM-DD hợp lệ.';
  }
  if (!priorities.includes(priority)) {
    errors.priority = 'Mức ưu tiên phải là high, medium hoặc low.';
  }
  if (typeof category !== 'string' || category.length > 80) {
    errors.category = 'Nhóm phải là văn bản không quá 80 ký tự.';
  }
  if (body.done !== undefined && ![true, false, 0, 1].includes(body.done)) {
    errors.done = 'Trạng thái hoàn thành không hợp lệ.';
  }

  return {
    errors,
    task: {
      title,
      due_date: dueDate,
      priority,
      category: typeof category === 'string' ? category.trim() : '',
      done: body.done === true || body.done === 1 ? 1 : 0
    }
  };
}

function sendError(res, status, message, details) {
  return res.status(status).json({ error: message, ...(details ? { details } : {}) });
}

router.get('/', (req, res) => {
  const { date, q, status = 'all', priority } = req.query;
  if (date && !isValidDate(date)) {
    return sendError(res, 400, 'Ngày lọc phải có định dạng YYYY-MM-DD hợp lệ.');
  }
  if (!statuses.includes(status)) {
    return sendError(res, 400, 'Trạng thái phải là all, done hoặc pending.');
  }
  if (priority && !priorities.includes(priority)) {
    return sendError(res, 400, 'Mức ưu tiên phải là high, medium hoặc low.');
  }

  const filters = [];
  const values = {};
  if (date) {
    filters.push('due_date = @date');
    values.date = date;
  }
  if (q) {
    filters.push("(title LIKE @query ESCAPE '\\' OR category LIKE @query ESCAPE '\\')");
    const escaped = String(q).replace(/[\\%_]/g, '\\$&');
    values.query = `%${escaped}%`;
  }
  if (status === 'done') filters.push('done = 1');
  if (status === 'pending') filters.push('done = 0');
  if (priority) {
    filters.push('priority = @priority');
    values.priority = priority;
  }

  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const tasks = db.prepare(`
    SELECT id, title, due_date, priority, category, done, done_at, created_at
    FROM tasks ${where}
    ORDER BY CASE WHEN done = 1 THEN 1 ELSE 0 END,
      CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
      due_date IS NULL, due_date, id DESC
  `).all(values);
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { errors, task } = validateTask(req.body);
  if (Object.keys(errors).length) return sendError(res, 400, 'Dữ liệu task không hợp lệ.', errors);

  const doneAt = task.done ? new Date().toISOString() : null;
  const result = db.prepare(`
    INSERT INTO tasks (title, due_date, priority, category, done, done_at)
    VALUES (@title, @due_date, @priority, @category, @done, @done_at)
  `).run({ ...task, done_at: doneAt });
  const created = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return sendError(res, 400, 'ID task không hợp lệ.');
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!existing) return sendError(res, 404, 'Không tìm thấy task.');

  const { errors, task } = validateTask(req.body);
  if (Object.keys(errors).length) return sendError(res, 400, 'Dữ liệu task không hợp lệ.', errors);
  const doneAt = task.done ? (existing.done ? existing.done_at : new Date().toISOString()) : null;
  db.prepare(`
    UPDATE tasks SET title = @title, due_date = @due_date, priority = @priority,
      category = @category, done = @done, done_at = @done_at
    WHERE id = @id
  `).run({ ...task, done_at: doneAt, id });
  res.json(db.prepare('SELECT * FROM tasks WHERE id = ?').get(id));
});

router.patch('/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return sendError(res, 400, 'ID task không hợp lệ.');
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!task) return sendError(res, 404, 'Không tìm thấy task.');
  const done = task.done ? 0 : 1;
  const doneAt = done ? new Date().toISOString() : null;
  db.prepare('UPDATE tasks SET done = ?, done_at = ? WHERE id = ?').run(done, doneAt, id);
  res.json(db.prepare('SELECT * FROM tasks WHERE id = ?').get(id));
});

router.delete('/clear', (req, res) => {
  const result = db.prepare('DELETE FROM tasks').run();
  res.json({ message: 'Đã xóa toàn bộ task.', deleted: result.changes });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return sendError(res, 400, 'ID task không hợp lệ.');
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  if (!result.changes) return sendError(res, 404, 'Không tìm thấy task.');
  res.json({ message: 'Đã xóa task.' });
});

router.post('/mock', (req, res) => {
  const today = new Date();
  // Tính ngày tương đối để bộ dữ liệu mẫu luôn gần ngày hiện tại.
  const formatLocalDate = (date) => [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
  const offsetDate = (offset) => {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    return formatLocalDate(date);
  };
  const samples = [
    [-6, 'Đọc 20 trang sách', 'Cá nhân', 'low', 1],
    [-6, 'Gửi báo cáo tuần', 'Công việc', 'high', 1],
    [-5, 'Lên kế hoạch tập luyện', 'Sức khỏe', 'medium', 1],
    [-5, 'Dọn dẹp bàn làm việc', 'Cá nhân', 'low', 0],
    [-4, 'Hoàn thành bản thiết kế', 'Công việc', 'high', 1],
    [-4, 'Gọi điện hỏi thăm gia đình', 'Gia đình', 'medium', 1],
    [-3, 'Thanh toán hóa đơn điện', 'Tài chính', 'high', 0],
    [-3, 'Mua thực phẩm cho tuần', 'Gia đình', 'medium', 1],
    [-2, 'Ôn tập tiếng Anh', 'Học tập', 'medium', 1],
    [-2, 'Sao lưu dữ liệu máy tính', 'Cá nhân', 'low', 0],
    [-1, 'Chuẩn bị nội dung cuộc họp', 'Công việc', 'high', 0],
    [0, 'Hoàn thành bài tập hôm nay', 'Học tập', 'medium', 0],
    [0, 'Đi bộ 30 phút', 'Sức khỏe', 'low', 1],
    [1, 'Đặt lịch khám sức khỏe', 'Sức khỏe', 'medium', 0],
    [2, 'Lên ngân sách tháng tới', 'Tài chính', 'high', 0],
    [4, 'Gặp bạn uống cà phê', 'Cá nhân', 'low', 0]
  ];
  const insert = db.prepare(`
    INSERT INTO tasks (title, due_date, priority, category, done, done_at)
    SELECT @title, @due_date, @priority, @category, @done, @done_at
    WHERE NOT EXISTS (
      SELECT 1 FROM tasks WHERE title = @title AND due_date = @due_date
    )
  `);
  const addSamples = db.transaction(() => {
    let added = 0;
    for (const [offset, title, category, priority, done] of samples) {
      const date = offsetDate(offset);
      const result = insert.run({
        title,
        due_date: date,
        priority,
        category,
        done,
        done_at: done ? `${date}T12:00:00.000Z` : null
      });
      added += result.changes;
    }
    return added;
  });
  res.status(201).json({ message: 'Đã nạp dữ liệu mẫu.', added: addSamples() });
});

module.exports = router;
