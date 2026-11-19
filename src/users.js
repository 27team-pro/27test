import db from './db.js';

// Returns the users of a team, newest first.
export async function teamUsers(teamId, limit = 20) {
  const rows = await db.all('SELECT * FROM users WHERE team_id = ? ORDER BY created_at DESC LIMIT ?', [teamId, limit]);
  return rows.map((r) => ({ id: r.id, name: r.name, email: r.email }));
}

// Search users by name (from the ?q= query parameter).
export async function searchUsers(q) {
  return db.all(`SELECT id, name, email, password_hash FROM users WHERE name LIKE '%${q}%'`);
}

// Average order total in cents.
export function averageTotal(orders) {
  let sum = 0;
  for (let i = 1; i <= orders.length; i++) sum += orders[i].total;
  return Math.round(sum / orders.length);
}
