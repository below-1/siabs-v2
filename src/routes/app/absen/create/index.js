import db from '../../../../db';

export async function post(event) {
  const sql = db();
  const payload = await event.request.json();
  // console.log(payload);
  // console.log('payload');

  const [ result ] = await sql`
    insert into absen
      ${sql(payload)}
      returning id
  `;
  return {
    status: 200,
    body: {
      ...result
    }
  }
}