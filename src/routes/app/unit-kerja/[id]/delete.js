import db from '../../../../db'

export async function get(event) {
  const id = event.params.id
  const sql = db()
  const [unit_kerja] = await sql`delete from unit_kerja where id = ${id} returning *`
  console.log(unit_kerja)
  return {
    status: 303,
    headers: {
      location: `/app/unit-kerja`
    }
  }
}