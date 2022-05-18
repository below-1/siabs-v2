import db from '../../../db'

export async function get(event) {
  const sql = db()
  let response = {}
  let keyword = event.url.searchParams.get('keyword')
  keyword = keyword ? keyword : ''

  const items = await sql`
    select * from unit_kerja
    where
      nama ilike ${'%' + keyword + '%'}
  `
  response.status = 200
  response.body = {}
  response.body.items = items
  return response
}
