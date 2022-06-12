import db from '../../../../../../db';
import day from '$lib/day';

function aggregateForInduk(id, start, end, sql) {
  return 
}

export async function get(event) {
  const id = event.params.id
  const type = event.url.searchParams.get('type');

  let start = event.url.searchParams.get('start');
  start = start ? new Date(start) : day().startOf('month').toDate();
  let end = event.url.searchParams.get('end');
  end = end ? new Date(end) : day(start).endOf('month').toDate();

  const sql = db();
  const items = await sql`
    select
      
      ab.id,
      p.nik,
      p.nama,

      ab.alert_masuk,
      ab.absen_masuk,
      ab.status_masuk,

      ab.alert_keluar,
      ab.absen_keluar,
      ab.status_keluar

      from absen ab
        join pegawai p on ab.nik = p.nik
      where 
        ab.id_unit_kerja = ${id}
        and ab.alert_masuk >= ${start}
        and ab.alert_masuk <= ${end}
      order by ab.alert_masuk
  `;

  return {
    body: {
      items
    }
  }
}