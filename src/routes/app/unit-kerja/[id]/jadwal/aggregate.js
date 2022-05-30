import db from '../../../../../db';
import day from '$lib/day';

function aggregateForInduk(id, start, end, sql) {
  return sql`
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
        )
        select days.d,
          count(ab.id) as total_absen
          from days
          left join absen_ctx ab on ab.tanggal = days.d
          group by days.d
  `
}

export async function get(event) {
  const id = event.params.id
  const type = event.url.searchParams.get('type');

  let start = event.url.searchParams.get('start');
  start = start ? new Date(start) : day().startOf('month').toDate();
  let end = event.url.searchParams.get('end');
  end = end ? new Date(end) : day(start).endOf('month').toDate();

  const sql = db();
  const aggregation = await aggregateForInduk(id, start, end, sql);

  // const aggregation = await sql`
    // with 
    //   days as (
    //     select generate_series(
    //       ${start},
    //       ${end},
    //       '1 day'::interval
    //     )::date as d
    //   ),
  //   foo as (
  //     select 
  //       a.alert_masuk::date as d, 
  //       count(distinct a.nik)
  //       from jadwal j
  //           join shift s on j.id = s.id_jadwal
  //           join absen a on a.id_shift = s.id
  //         where 
  //           j.id_unit_kerja = ${id}
  //           and a.alert_masuk >= ${start}
  //           and a.alert_keluar <= ${end}
  //         group by a.alert_masuk::date
  //     )
  //     select days.d date, coalesce(foo.count, 0) as total_absen 
  //       from days left join foo on days.d = foo.d
  // `
  // const aggregation = []
  console.log(aggregation);
  console.log('aggregation');

  return {
    body: {
      aggregation
    }
  }
}