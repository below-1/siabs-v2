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
      )
      select 
        d::date as day
      from days
      order by day
      limit 5
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