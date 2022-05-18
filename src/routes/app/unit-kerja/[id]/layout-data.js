import db from '../../../../db'

export async function get(event) {
  const sql = db()
  const [ unitKerja ] = await sql`select * from unit_kerja where id = ${event.params.id}`
  return {
    status: 200,
    body: {
      unitKerja
    }
  }
}