const express = require('express');
const path = require('path');
const tasksRouter = require('./routes/tasks');
const statsRouter = require('./routes/stats');
require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '100kb' }));
app.use('/api/tasks', tasksRouter);
app.use('/api/stats', statsRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON gửi lên không hợp lệ.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Đã xảy ra lỗi máy chủ.' });
});

app.listen(PORT, () => {
  console.log(`Todo app đang chạy tại http://localhost:${PORT}`);
});
