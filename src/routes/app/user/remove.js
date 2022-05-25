import db from '../../../db'

export async function get(event) {
  const username = event.url.searchParams.get('username')
  const section_redirect = event.url.searchParams.get('section_redirect')
  const sql = db()
  const [ result ] = await sql`
    delete from "user" where "username" = ${username}
      returning "username"
  `
  return {
    status: 303,
    headers: {
      location: `/app/${section_redirect}`
    }
  }
}