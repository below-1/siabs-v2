import db from '../../../db'

export async function get(event) {

  let limit = event.url.searchParams.get('limit')
  limit = limit ? parseInt(limit) : null;

  let after = event.url.searchParams.get('after')
  after = after ? after : ''

  let keyword = event.url.searchParams.get('keyword')

  let response = {}
  response.status = 200
  response.body = {}

  const sql = db()

  console.log('limit')
  console.log(limit)

  const keywordFilter = (k) => sql`and nama ilike ${'%' + k + '%'}`
  const afterFilter = (af) => sql`nik > ${af}`

  const items = await sql`
    select * from pegawai 
      where
        nik > ${after}
        ${ keyword ? keywordFilter(keyword) : sql`` }
      order by nik
      ${ limit ? sql`limit ${limit}` : sql`` }
  `
  response.body.items = items
  return response
}