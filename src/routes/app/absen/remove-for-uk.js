import db from '../../../db';
import day from '$lib/day';

export async function get(event) {
  const start = new Date(event.url.searchParams.get('start'));
  const end = new Date(event.url.searchParams.get('end'));
  const id = event.url.searchParams.get('id');

  const sql = db();

  await sql`
    delete from absen
      where alert_masuk >= ${start}
        and alert_masuk < ${end}
        and id_unit_kerja = ${id}
  `;

  return {
    status: 200,
    body: {
      message: 'success'
    }
  }
}