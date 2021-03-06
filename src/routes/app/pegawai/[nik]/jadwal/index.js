import db from '../../../../../db';
import day from '$lib/day';

export async function get(event) {
  const nik = event.params.nik;
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
        ) as d
      ),
      absen_data as (
        select 
          absen.id,
          absen.alert_masuk,
          absen.alert_keluar,
          absen.tipe
          from absen where 
            alert_masuk >= ${start}
            and alert_masuk <= ${end}
            and nik = ${nik}
      )
    select 
        (days.d at time zone 'Asia/Makassar')::date as date,
        count(abd.id) as total_absen,
        json_agg(abd) as absen
      from days
      left join 
        absen_data abd on 
          abd.alert_masuk >= days.d 
          and abd.alert_masuk < (days.d + '1 day'::interval)
      group by days.d
      order by days.d
  `;
  return {
    body: {
      aggregation
    }
  }
}