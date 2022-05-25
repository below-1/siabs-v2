import db from '../../../../db'

export async function get(event) {
  const id = event.params.id
  const sql = db()
  const [ result ] = await sql`
    delete from absen where id = ${id}
      returning id
  `
  return {
    body: {
      ...result
    }
  }
}