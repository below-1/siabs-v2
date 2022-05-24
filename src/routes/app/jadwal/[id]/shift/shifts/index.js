import db from '../../../../../../db'

export async function get(event) {
  const id_jadwal = event.params.id

  const sql = db()

  const items = await sql`
    select 
        sh.*,
        coalesce( count(ab.id), 0 ) as total_absen
      from shift sh
      left join absen ab
        on ab.id_shift = sh.id
      where sh.id_jadwal = ${id_jadwal}
      group by sh.id
      order by sh.waktu_masuk desc
      limit 10
  `

  return {
    body: {
      shifts: items
    }
  }
}