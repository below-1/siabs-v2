import db from '../../../../../../../db';
import day from '$lib/day';

export async function get(event) {
  const id = event.params.id;
  const start = day(event.url.searchParams.get('start')).toDate();
  const end = day(event.url.searchParams.get('end')).toDate();

  const sql = db();
  const items = await sql`
    select 
      p.nik,
      p.nama,
      p.nip,
      p.avatar,
      ab.kode_shift,
      ab.id
      from absen ab 
        left join pegawai p on p.nik = ab.nik
        where ab.id_unit_kerja = ${id}
          and ab.alert_masuk >= ${start}
          and ab.alert_masuk <= ${end}
        order by ab.alert_masuk
  `;
  return {
    body: {
      items,
      start,
      end
    }
  }
}