import db from '../../../../db'

export async function post(event) {
  const { tenant } = event.locals.session
  let payload = await event.request.json()
  payload = {
    ...payload,
    id_tenant: tenant.id
  }
  console.log('payload')
  console.log(payload)
  const sql = db()
  const [ result ] = await sql`
    insert into absen ${sql(payload)}
      returning id
  `
  return {
    body: {
      ...result
    }
  }
}
