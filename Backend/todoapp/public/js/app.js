const taskList = document.getElementById('taskList');
const taskDialog = document.getElementById('taskDialog');
const taskForm = document.getElementById('taskForm');
const today = new Date();
const todayIso = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-');
let showingAll = false;
let searchTimer;

document.getElementById('headerDate').textContent = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'short', day: 'numeric', month: 'short'
}).format(today);
document.getElementById('todayLabel').textContent = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
}).format(today);

function escapeHtml(value) {
  // Mã hóa nội dung task trước khi ghép vào giao diện HTML.
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function displayDate(value) {
  if (!value) return 'Chưa đặt ngày';
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'short' })
    .format(new Date(`${value}T00:00:00`));
}

function priorityLabel(priority) {
  return { high: 'Ưu tiên cao', medium: 'Ưu tiên vừa', low: 'Ưu tiên thấp' }[priority] || priority;
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Không thể thực hiện yêu cầu.');
  return data;
}

async function loadTasks() {
  const params = new URLSearchParams();
  if (!showingAll) params.set('date', todayIso);
  const q = document.getElementById('searchInput').value.trim();
  const status = document.getElementById('statusFilter').value;
  const priority = document.getElementById('priorityFilter').value;
  if (q) params.set('q', q);
  if (status !== 'all') params.set('status', status);
  if (priority) params.set('priority', priority);

  try {
    const tasks = await request(`/api/tasks?${params.toString()}`);
    document.getElementById('listHeading').textContent = showingAll ? 'Tất cả task' : 'Hôm nay';
    document.getElementById('taskCount').textContent = tasks.length;
    renderTasks(tasks);
  } catch (error) {
    taskList.innerHTML = `<div class="empty-state"><h3>Không tải được danh sách</h3><p>${escapeHtml(error.message)}</p></div>`;
  }
}

function renderTasks(tasks) {
  if (!tasks.length) {
    const heading = document.getElementById('searchInput').value.trim()
      ? 'Không tìm thấy task phù hợp'
      : (showingAll ? 'Chưa có task nào' : 'Hôm nay chưa có task');
    const description = showingAll
      ? 'Thêm một task mới để bắt đầu sắp xếp công việc của bạn.'
      : 'Bạn có thể thêm việc cần làm hoặc xem toàn bộ danh sách.';
    taskList.innerHTML = `<div class="empty-state"><div class="empty-illustration">✓</div><h3>${heading}</h3><p>${description}</p></div>`;
    return;
  }

  taskList.innerHTML = tasks.map((task) => {
    const overdue = !task.done && task.due_date && task.due_date < todayIso;
    const category = task.category ? `<span>${escapeHtml(task.category)}</span>` : '';
    return `
      <article class="task-row ${task.done ? 'done' : ''}">
        <input class="task-check" type="checkbox" aria-label="Đánh dấu ${escapeHtml(task.title)}" data-toggle="${task.id}" ${task.done ? 'checked' : ''}>
        <div class="task-main">
          <p class="task-title">${escapeHtml(task.title)}</p>
          <div class="task-meta">
            <span class="${overdue ? 'overdue-text' : ''}">${overdue ? 'Quá hạn · ' : ''}${displayDate(task.due_date)}</span>
            ${category ? `<span aria-hidden="true">·</span>${category}` : ''}
          </div>
        </div>
        <div class="task-actions">
          <span class="priority-pill priority-${task.priority}">${priorityLabel(task.priority)}</span>
          <button class="icon-button" type="button" data-edit="${task.id}" aria-label="Sửa task">✎</button>
          <button class="icon-button delete" type="button" data-delete="${task.id}" aria-label="Xóa task">⌫</button>
        </div>
      </article>`;
  }).join('');
}

function openTaskDialog(task) {
  taskForm.reset();
  document.getElementById('taskId').value = task?.id || '';
  document.getElementById('titleInput').value = task?.title || '';
  document.getElementById('dueDateInput').value = task?.due_date || todayIso;
  document.getElementById('priorityInput').value = task?.priority || 'medium';
  document.getElementById('categoryInput').value = task?.category || '';
  document.getElementById('dialogTitle').textContent = task ? 'Chỉnh sửa task' : 'Thêm task mới';
  document.getElementById('saveTaskButton').textContent = task ? 'Lưu thay đổi' : 'Lưu task';
  document.getElementById('formError').textContent = '';
  taskDialog.showModal();
  document.getElementById('titleInput').focus();
}

document.getElementById('allTasksButton').addEventListener('click', () => {
  showingAll = !showingAll;
  document.getElementById('allTasksButton').innerHTML = showingAll
    ? 'Chỉ xem hôm nay <span aria-hidden="true">→</span>'
    : 'Xem tất cả task <span aria-hidden="true">→</span>';
  loadTasks();
});
document.getElementById('addTaskButton').addEventListener('click', () => openTaskDialog());
document.getElementById('closeDialog').addEventListener('click', () => taskDialog.close());
document.getElementById('cancelDialog').addEventListener('click', () => taskDialog.close());
document.getElementById('searchInput').addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadTasks, 180);
});
document.getElementById('statusFilter').addEventListener('change', loadTasks);
document.getElementById('priorityFilter').addEventListener('change', loadTasks);

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('taskId').value;
  const task = {
    title: document.getElementById('titleInput').value,
    due_date: document.getElementById('dueDateInput').value || null,
    priority: document.getElementById('priorityInput').value,
    category: document.getElementById('categoryInput').value
  };
  try {
    await request(id ? `/api/tasks/${id}` : '/api/tasks', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(task)
    });
    taskDialog.close();
    await loadTasks();
  } catch (error) {
    document.getElementById('formError').textContent = error.message;
  }
});

taskList.addEventListener('change', async (event) => {
  const toggleId = event.target.dataset.toggle;
  if (!toggleId) return;
  try {
    await request(`/api/tasks/${toggleId}/toggle`, { method: 'PATCH' });
    await loadTasks();
  } catch (error) {
    window.alert(error.message);
    loadTasks();
  }
});

taskList.addEventListener('click', async (event) => {
  const editId = event.target.closest('[data-edit]')?.dataset.edit;
  const deleteId = event.target.closest('[data-delete]')?.dataset.delete;
  if (editId) {
    try {
      const tasks = await request(`/api/tasks?${showingAll ? '' : `date=${todayIso}&`}`);
      const task = tasks.find((item) => String(item.id) === editId);
      if (task) openTaskDialog(task);
    } catch (error) {
      window.alert(error.message);
    }
  }
  if (deleteId && window.confirm('Bạn có chắc muốn xóa task này không?')) {
    try {
      await request(`/api/tasks/${deleteId}`, { method: 'DELETE' });
      await loadTasks();
    } catch (error) {
      window.alert(error.message);
    }
  }
});

loadTasks();
