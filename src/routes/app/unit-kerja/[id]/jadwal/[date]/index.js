import db from '../../../../../../db';
import day from '$lib/day';

export async function get(event) {
  const date = new Date(event.params.date);
  const start = day(date).startOf('day').toDate()
  const end = day(date).endOf('day').toDate()
  const id = event.params.id;
  const sql = db()
  const items = await sql` 
    select 
      p.nik,
      json_agg(p)->0 as pegawai,
      json_agg(a) as absen
      from 
        jadwal j
          join shift s on j.id = s.id_jadwal
          join absen a on a.id_shift = s.id
          join pegawai p on a.nik = p.nik
        where 
          id_unit_kerja = ${id}
            and a.alert_masuk >= ${start} and a.alert_masuk <= ${end}
        group by p.nik
  `;
  // console.log(items.map(it => it.absen));
  // console.log(items);
  // console.log('items');
  // throw new Error('stop');
  return {
    body: {
      date,
      items
    }
  }
}