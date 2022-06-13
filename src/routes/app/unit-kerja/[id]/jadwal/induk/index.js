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
          ) as d
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
        select (days.d at time zone 'Asia/Makassar') as d,
          count(ab.id) as total_absen
          from days
          left join absen_ctx ab 
            on 
              ab.alert_masuk >= days.d 
              and ab.alert_masuk < (days.d + '1 day'::interval)
          group by days.d
          order by days.d
  `;

  const pegawaiList = await sql`
    select 
      distinct a.nik,
      p.nama,
      p.nip,
      p.avatar
    from absen a
      left join pegawai p on p.nik = a.nik
      where 
        a.id_unit_kerja = ${id}
        and a.alert_masuk >= ${start}
        and a.alert_masuk <= ${end}
  `;

  return {
    body: {
      aggregation,
      pegawaiList,
      start,
      end
    }
  }
}