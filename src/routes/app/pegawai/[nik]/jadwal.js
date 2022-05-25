import db from '../../../../db'

export async function get(event) {
  const nik = event.params.nik;

  const sql = db();

  const after = event.url.searchParams.get('after');
  const after_part = after 
    ? sql`and alert_masuk < ${new Date(after)}` 
    : sql``;

  const items = await sql`
    select 

      ab.id,
      row_to_json(ab) absen,
      json_agg(uk)->0 unit_kerja

      from absen ab
      left join shift sh on ab.id_shift = sh.id
      left join jadwal j on sh.id_jadwal = j.id
      left join unit_kerja uk on j.id_unit_kerja = uk.id

      where 
        ab.nik = ${nik}
        ${after_part}

      group by ab.id
      order by alert_masuk desc
      limit 10
  `;
  return {
    body: {
      items
    }
  }
}