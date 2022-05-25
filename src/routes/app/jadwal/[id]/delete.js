import db from '../../../../db'

export async function get(event) {
  const id = event.params.id
  const sql = db()
  const [ result ] = await sql`
    delete from jadwal where id = ${id}
      returning id
  `
  return {
    status: 303,
    headers: {
      location: '/app/jadwal'
    }
  }
}
