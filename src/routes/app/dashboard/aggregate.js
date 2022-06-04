import db from '../../../db';
import day from '$lib/day';

export async function get(event) {
  let start = event.url.searchParams.get('start');
  start = start ? new Date(start) : day().startOf('month').toDate();
  let end = event.url.searchParams.get('end');
  end = end ? new Date(end) : day(start).endOf('month').toDate();

  const sql = db();
  const items = await sql`
      with 
        days as (
          select generate_series(
            ${start},
            ${end},
            '1 day'::interval
          ) as d
        ),
        absen_ctx as (
          select 
            absen.* 
          from absen
            where 
              alert_masuk >= ${start}
              and alert_masuk <= ${end}
        )
        select 
          (days.d at time zone 'Asia/Makassar')::date as d,
          count(ab.id) filter (
            where ab.status_masuk = 'alpa' 
              and ab.status_keluar = 'alpa') as alpa,
          count(ab.id) filter (
              where ab.status_masuk = 'in-time') as in_time,
          count(ab.id) filter (
            where ab.status_masuk = 'late') as late

          from days
            left join absen_ctx ab 
              on ab.alert_masuk >= days.d 
                and ab.alert_masuk < (days.d + '1 day'::interval)

          group by days.d
          order by days.d
  `;
  console.log(items);
  console.log('items');

  return {
    body: {
      items
    }
  }
}
