import db from '../../../../../db'

export async function get(event) {
  const id = event.params.id
  const sql = db()
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
      items
    }
  }
}