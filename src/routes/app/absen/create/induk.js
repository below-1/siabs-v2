import db from '../../../../db';

export async function post(event) {
  const sql = db();
  const payloadList = await event.request.json();

  const result = await sql`
    insert into absen
      ${sql(payloadList)}
  `;
  return {
    status: 200,
    body: {
      message: 'OK'
    }
  }
}