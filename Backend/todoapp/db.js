const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, 'todoapp.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
// Tự tạo bảng và chỉ mục khi ứng dụng khởi động lần đầu.
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL CHECK (length(trim(title)) > 0),
    due_date TEXT,
    priority TEXT NOT NULL DEFAULT 'medium'
      CHECK (priority IN ('high', 'medium', 'low')),
    category TEXT NOT NULL DEFAULT '',
    done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1)),
    done_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
  CREATE INDEX IF NOT EXISTS idx_tasks_done ON tasks(done);
`);

module.exports = db;
