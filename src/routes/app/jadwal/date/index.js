import db from '$src/db';
import day from '$lib/day';

export async function get(event) {
  let start = new Date(event.url.searchParams.get('start'));
  let end = new Date(event.url.searchParams.get('end'));
  let nochange = event.url.searchParams.has('nochange');
  const sql = db();

  const items = await sql`
    select 
        ab.id,
        row_to_json(ab) as absen,
        json_agg(p)->0 as pegawai,
        json_agg(uk)->0 as unit_kerja
      from absen ab
        left join pegawai p on ab.nik = p.nik
        left join unit_kerja uk on ab.id_unit_kerja = uk.id
      where ab.alert_masuk >= ${start}
        and ab.alert_masuk <= ${end}
      group by ab.id
  `;

  return {
    status: 200,
    body: {
      items,
      start,
      end,
      nochange
    }
  }
}
