import db from '../../../../db';

export async function post(event) {
  const oldUsername = event.params.username;
  const payload = await event.request.json();
  const sql = db();
  await sql`
    update "user" 
      set "username" = ${payload.username}
      where "username" = ${oldUsername}
  `;
  return {
    body: {
      message: 'success'
    }
  }
}