const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const totals = db.prepare(`
    SELECT COUNT(*) AS total,
      SUM(CASE WHEN done = 1 THEN 1 ELSE 0 END) AS completed,
      SUM(CASE WHEN done = 0 THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN done = 0 AND due_date < date('now', 'localtime') THEN 1 ELSE 0 END) AS overdue
    FROM tasks
  `).get();
  const total = totals.total || 0;
  const completed = totals.completed || 0;
  const today = new Date();
  const formatLocalDate = (date) => [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
  const days = [];
  // Biểu đồ gồm hôm nay và sáu ngày liền trước.
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(date.getDate() - offset);
    days.push(formatLocalDate(date));
  }
  const dayCounts = db.prepare(`
    SELECT due_date, COUNT(*) AS count
    FROM tasks WHERE due_date BETWEEN ? AND ?
    GROUP BY due_date
  `).all(days[0], days[6]);
  const countsByDate = new Map(dayCounts.map((item) => [item.due_date, item.count]));
  const byDay = days.map((date) => ({
    date,
    count: countsByDate.get(date) || 0
  }));
  const byPriority = db.prepare(`
    SELECT priority, COUNT(*) AS count
    FROM tasks GROUP BY priority
  `).all();
  const byCategory = db.prepare(`
    SELECT COALESCE(NULLIF(trim(category), ''), 'Chưa phân nhóm') AS category,
      COUNT(*) AS count
    FROM tasks GROUP BY COALESCE(NULLIF(trim(category), ''), 'Chưa phân nhóm')
    ORDER BY count DESC, category
  `).all();

  res.json({
    total,
    completed,
    pending: totals.pending || 0,
    overdue: totals.overdue || 0,
    completion_rate: total ? Math.round((completed / total) * 100) : 0,
    by_day: byDay,
    by_priority: byPriority,
    by_category: byCategory
  });
});

module.exports = router;
