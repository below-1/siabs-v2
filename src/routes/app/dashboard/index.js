import db from '../../../db';
import day from '$lib/day';

export async function get(event) {
  const id = event.params.id;
  const date = day();
  const type = event.url.searchParams.get('type');
  const start = date.startOf('month');
  const end = date.endOf('month');

  const sql = db();
  const [ aggregate_1 ] = await sql`
    select 
      count(ab.id) as total,
      count(1) filter (where tipe = 'dl') as dl,
      count(1) filter (where tipe = 'wfo') as wfo,
      count(1) filter (where tipe = 'wfh') as wfh,
      count(1) filter (where kode_shift = 1) as shift_1,
      count(1) filter (where kode_shift = 2) as shift_2,
      coalesce(count(1) filter (where status_masuk = 'alpa'), 0) as alpa,
      coalesce(count(1) filter (where status_masuk != 'alpa'), 0) as masuk
      from absen ab
        where ab.alert_masuk >= ${start.toDate()}
          and ab.alert_masuk <= ${end.toDate()}
  `;

  return {
    body: {
      aggregate_1
    }
  }
}