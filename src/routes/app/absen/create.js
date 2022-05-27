import db from '../../../db'

export async function post(event) {
  const { tenant } = event.locals.session;
  let payload = await event.request.json()
  payload.id_tenant = tenant.id;
  const sql = db()
  const [ result ] = await sql`
    insert into absen ${sql(payload)}
      returning id
  `
  console.log(result)
  console.log('result')
  return {
    body: {
      ...result
    }
  }
}
