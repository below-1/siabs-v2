import db from '../../../../../../db';
import day from '$lib/day';

export async function get(event) {
  const start = day(event.url.searchParams.get('start')).toDate();
  const end = day(event.url.searchParams.get('end')).toDate();
  const id = event.params.id;
  const sql = db();

  const items = await sql`
    select 
      ab.id,
      ab.tipe,
      p.nama,
      p.nip,
      p.nik,
      p.avatar
      from absen ab
        left join pegawai p on ab.nik = p.nik
      where ab.alert_masuk >= ${start}
        and ab.alert_masuk <= ${end}
        and ab.id_unit_kerja = ${id}
  `;

  return {
    body: {
      items
    }
  }
}