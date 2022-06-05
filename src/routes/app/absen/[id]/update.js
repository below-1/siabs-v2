import db from '../../../../db';

export async function post(event) {
  const payload = await event.request.json();
  const id = event.params.id;
  const sql = db();

  const result = await sql`
    update absen
        set ${sql(payload)}
      where id = ${id}
  `;
  return {
    body: {
      message: 'success'
    }
  }
}