import db from '../../../../../db';
import day from '$lib/day';

export async function get(event) {
  const id = event.params.id
  let start = event.url.searchParams.get('start');
  console.log(`start = ${start}`)
  start = start ? new Date(start) : day().startOf('month').toDate();
  let end = event.url.searchParams.get('end');
  console.log(`end = ${end}`)
  end = end ? new Date(end) : day(start).endOf('month').toDate();

  console.log(`id = ${id}`)
  console.log(`start = ${start}`)
  console.log(`end = ${end}`)

  const sql = db()

  const aggregation = await sql`
    with 
      days as (
        select generate_series(
          ${start},
          ${end},
          '1 day'::interval
        )::date as d
      ),
    foo as (
      select 
        a.alert_masuk::date as d, count(a.id)
        from jadwal j
            join shift s on j.id = s.id_jadwal
              join absen a on a.id_shift = s.id
          where 
            id_unit_kerja = '4bed80d5-3224-44e0-b5dd-71c77b60a43e'
            and alert_masuk >= ${start}
            and alert_keluar <= ${end}
          group by a.alert_masuk
      )
      select days.d date, coalesce(foo.count, 0) as total_absen 
        from days left join foo on days.d = foo.d
  `
  console.log(aggregation);
  console.log('aggregation');

  const items = await sql`
    select 
        j.id,
        row_to_json(j) as jadwal,
        json_agg(shift) as shifts

      from jadwal j
        left join shift on shift.id_jadwal = j.id

      where j.id_unit_kerja = ${id}
      group by j.id
      order by day_start desc
      limit 10
  `
  return {
    body: {
      items,
      aggregation
    }
  }
}