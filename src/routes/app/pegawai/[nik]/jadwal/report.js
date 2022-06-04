import db from '../../../../../db';
import day from '$lib/day';

export async function get(event) {
  const nik = event.params.nik;
  const start = new Date(event.url.searchParams.get('start'));
  const end = new Date(event.url.searchParams.get('end'));

  const sql = db();

  const items = await sql`
    select *
      from absen where 
        alert_masuk >= ${start}
        and alert_masuk <= ${end}
        and nik = ${nik}
        order by alert_masuk asc
  `;
  
  return {
    body: {
      items
    }
  }
}