import db from '../../../db'

export async function get(event) {
  const { tenant } = event.locals.session
  const sql = db()
  let response = {}
  const items = await sql`
    select * from unit_kerja
    where id_tenant = ${tenant.id}
  `
  response.status = 200
  response.body = {}
  response.body.items = items
  return response
}

