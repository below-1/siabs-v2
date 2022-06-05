import db from '../../../../../db';
import day from '$lib/day';

export async function get(event) {
  const nik = event.params.nik;
  const date = day();
  const start = date.startOf('month');
  const end = date.endOf('month');

  const sql = db();
  const [ aggregate ] = await sql`
    select 
      coalesce(count(ab.id), 0) as total,
      coalesce(count(1) filter (where tipe = 'dl'), 0) as dl,
      coalesce(count(1) filter (where tipe = 'wfo'), 0) as wfo,
      coalesce(count(1) filter (where tipe = 'wfh'), 0) as wfh,
      coalesce(count(1) filter (where kode_shift = 1), 0) as shift_1,
      coalesce(count(1) filter (where kode_shift = 2), 0) as shift_2
      from absen ab
        where ab.alert_masuk >= ${start.toDate()}
          and ab.alert_masuk <= ${end.toDate()}
          and nik = ${nik}
  `;

  return {
    body: {
      aggregate
    }
  }
}