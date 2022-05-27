import db from '../../../../../../db'

export async function get(event) {
  const id = event.params.id
  const sql = db()
  const days = await sql`
    with 
      jadwal as (
        select * from jadwal where id = ${id}
      ),
      days as (
        select generate_series(
          jadwal.day_start,
          jadwal.day_end,
          '1 day'::interval
        ) as d from jadwal
      ),
      shifts as (
        select * from shift where id_jadwal = ${id}
      ),
      sh_with_date as (
        select 
          days.d,
          sh.id,
          sh.waktu_masuk
        from days, shifts sh
      )

  select 
    shd.d::date as day,
        shd.id as id_shift,
        coalesce( count(ab.id), 0 ) as total_absen
      from sh_with_date shd
        left join absen ab on 
          (shd.d::date = ab.alert_masuk::date)
            and (shd.id = ab.id_shift)
      group by shd.d, shd.id
  `
  const shifts = await sql`
    select * 
      from shift where id_jadwal = ${id}
      order by waktu_masuk
  `
  return {
    body: {
      days,
      shifts
    }
  }
}