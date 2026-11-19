import sqlite from 'better-sqlite3';
const conn = sqlite('app.db');
export default {
  all: (sql, params = []) => conn.prepare(sql).all(...params),
  get: (sql, params = []) => conn.prepare(sql).get(...params),
};
