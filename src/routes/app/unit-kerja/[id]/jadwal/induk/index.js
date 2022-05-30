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
  const aggregation = await sql`
      with 
        days as (
          select generate_series(
            ${start},
            ${end},
            '1 day'::interval
          )::date as d
        ),
        absen_ctx as (
          select 
            absen.alert_masuk::date as tanggal, 
            absen.* 
          from absen
            where 
              id_unit_kerja = ${id}
              and alert_masuk >= ${start}
              and alert_masuk <= ${end}
              and tipe != 'dl'
        )
        select days.d,
          count(ab.id) as total_absen
          from days
          left join absen_ctx ab on ab.tanggal = days.d
          group by days.d
  `;

  const nikList = await sql`
    select 
      distinct nik
    from absen
      where 
        id_unit_kerja = ${id}
        and alert_masuk >= ${start}
        and alert_masuk <= ${end}
  `;
  console.log(nikList);
  console.log('nikList');

  return {
    body: {
      aggregation,
      nikList: nikList.map(object => object.nik)
    }
  }
}