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
      ab.id,
      ab.alert_masuk,
      ab.alert_keluar,
      ab.tipe,
      p.nik,
      p.nama,
      p.avatar
      from 
        absen ab
        left join pegawai p on p.nik = ab.nik
        where 
          ab.id_unit_kerja = ${id}
          and ab.alert_masuk >= ${start} and ab.alert_masuk <= ${end}
        order by ab.alert_masuk
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