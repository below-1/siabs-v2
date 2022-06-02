import db from '../../../db';
import day from '$lib/day';

export async function get(event) {
  let start = new Date(event.url.searchParams.get('start'));
  let end = new Date(event.url.searchParams.get('end'));

  // console.log(start);
  // console.log('start');
  // console.log(end);
  // console.log('end');
  // throw new Error('stop');

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
  // items.forEach(it => {
  //   console.log(it.pegawai);
  //   console.log(it.unit_kerja);
  // });
  // throw new Error('stop');

  return {
    status: 200,
    body: {
      items
    }
  }
}
