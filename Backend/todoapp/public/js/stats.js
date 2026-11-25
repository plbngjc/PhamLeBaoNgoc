const summaryCards = document.getElementById('summaryCards');
const toast = document.getElementById('toast');
let toastTimer;

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Không thể thực hiện yêu cầu.');
  return data;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function renderSummary(stats) {
  const cards = [
    ['Tổng task', stats.total, '▦', 'Trong danh sách'],
    ['Đã hoàn thành', stats.completed, '✓', 'Việc đã xong'],
    ['Chưa hoàn thành', stats.pending, '◷', 'Đang chờ xử lý'],
    ['Task quá hạn', stats.overdue, '!', 'Cần ưu tiên'],
    ['Tỷ lệ hoàn thành', `${stats.completion_rate}%`, '↗', 'Trên tổng số task']
  ];
  summaryCards.innerHTML = cards.map(([label, value, icon, hint]) => `
    <article class="stat-card">
      <div class="stat-label"><span class="stat-icon">${icon}</span>${label}</div>
      <div class="stat-number">${value}</div><div class="stat-hint">${hint}</div>
    </article>
  `).join('');
}

function renderChart(days) {
  const chart = document.getElementById('weekChart');
  const max = Math.max(1, ...days.map((day) => day.count));
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');
  chart.innerHTML = days.map((day) => {
    const height = day.count ? Math.max(7, (day.count / max) * 100) : 0;
    const label = new Intl.DateTimeFormat('vi-VN', { weekday: 'short' })
      .format(new Date(`${day.date}T00:00:00`));
    const isToday = day.date === todayString;
    return `<div class="bar-column ${isToday ? 'today' : ''}" aria-label="${day.date}: ${day.count} task">
      <span class="bar-value">${day.count}</span>
      <div class="bar-track"><div class="bar-fill" style="height:${height}%"></div></div>
      <span class="bar-label">${isToday ? 'Nay' : label}</span>
    </div>`;
  }).join('');
}

function renderBreakdown(targetId, entries, key, labels = {}) {
  const target = document.getElementById(targetId);
  if (!entries.length) {
    target.innerHTML = '<p class="breakdown-empty">Chưa có dữ liệu để thống kê.</p>';
    return;
  }
  const max = Math.max(1, ...entries.map((item) => item.count));
  target.innerHTML = entries.map((item) => `
    <div class="breakdown-row ${key === 'priority' ? 'priority-row' : ''}">
      <span class="breakdown-name">${labels[item[key]] || item[key]}</span>
      <div class="breakdown-track"><div class="breakdown-fill" style="width:${(item.count / max) * 100}%"></div></div>
      <span class="breakdown-count">${item.count}</span>
    </div>
  `).join('');
}

async function loadStats() {
  try {
    const stats = await request('/api/stats');
    renderSummary(stats);
    renderChart(stats.by_day);
    renderBreakdown('priorityBreakdown', stats.by_priority, 'priority', {
      high: 'Ưu tiên cao', medium: 'Ưu tiên vừa', low: 'Ưu tiên thấp'
    });
    renderBreakdown('categoryBreakdown', stats.by_category, 'category');
  } catch (error) {
    summaryCards.innerHTML = `<div class="breakdown-empty">${error.message}</div>`;
  }
}

document.getElementById('mockButton').addEventListener('click', async () => {
  try {
    const result = await request('/api/tasks/mock', { method: 'POST', body: '{}' });
    showToast(`Đã nạp ${result.added} task mẫu.`);
    await loadStats();
  } catch (error) {
    showToast(error.message);
  }
});

document.getElementById('clearButton').addEventListener('click', async () => {
  if (!window.confirm('Xóa toàn bộ task? Thao tác này không thể hoàn tác.')) return;
  try {
    const result = await request('/api/tasks/clear', { method: 'DELETE' });
    showToast(`Đã xóa ${result.deleted} task.`);
    await loadStats();
  } catch (error) {
    showToast(error.message);
  }
});

loadStats();
