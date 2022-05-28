import db from '../../../db'

export async function get(event) {
  const { tenant } = event.locals.session;

  let limit = event.url.searchParams.get('limit')
  limit = limit ? parseInt(limit) : null;
  let after = event.url.searchParams.get('after')
  after = after ? after : ''

  let keyword = event.url.searchParams.get('keyword')

  let response = {};
  response.status = 200;
  response.body = {};

  const sql = db();

  const limitPart = limit 
    ? sql`limit ${limit}`
    : sql``;

  const keywordFilter = (k) => sql`and nama ilike ${'%' + k + '%'}`
  const afterFilter = (af) => sql`nik > ${af}`

  const items = await sql`
    select * from pegawai 
      where
        nik > ${after}
        ${ keyword ? keywordFilter(keyword) : sql`` }
      order by nik
      ${limitPart}
  `
  response.body.items = items
  return response
}