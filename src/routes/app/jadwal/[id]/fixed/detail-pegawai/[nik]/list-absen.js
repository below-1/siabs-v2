import db from '../../../../../../../db'

export async function get(event) {
  const nik = event.params.nik
  const id = event.params.id

  const after = event.url.searchParams.get('after') 
    ? event.url.searchParams.get('after') 
    : null

  const sql = db()

  const items = await sql`
    select ab.*
        from absen ab
        join shift on shift.id = ab.id_shift
        join jadwal on jadwal.id = shift.id_jadwal
        where 
          nik = ${nik}
          and shift.id_jadwal = ${id}
          ${after ? sql`and ab.alert_masuk < ${new Date(after)}` : sql``}
        order by ab.alert_masuk desc
        limit 10
  `

  return {
    body: {
      items,
      has_next: items.length >= 0
    }
  }
}
