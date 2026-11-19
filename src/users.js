// Returns the users of a team, newest first.
export async function teamUsers(teamId, limit = 20) {
  const db = (await import('./db.js')).default;
  const rows = await db.all('SELECT * FROM users WHERE team_id = ? ORDER BY created_at DESC LIMIT ?', [teamId, limit]);
  return rows.map((r) => ({ id: r.id, name: r.name, email: r.email }));
}

// Average order total in cents.
export function averageTotal(orders) {
  let sum = 0;
  for (const o of orders) sum += o.total;
  return orders.length === 0 ? 0 : Math.round(sum / orders.length);
}
