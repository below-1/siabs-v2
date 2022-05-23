import db from '../../../../../db'

export async function get(event) {
  const { id } = event.params;
  const limit = event.url.searchParams.get('limit')
  const keyword = event.url.searchParams.get('keyword')

  const sql = db()

  const limit_part = limit ? sql`limit ${limit}` : sql``;
  const keyword_part = keyword ? sql`and keyword ilike ${'%' + keyword + '%'}` : sql``;

  const items = await sql`
    with not_free as (
      select 
          distinct ab.nik
          from absen ab
          join shift sh on sh.id = ab.id_shift
        where 
          id_jadwal = ${id}
    )
    select * from pegawai 
      where 
        nik not in (select nik from not_free)
        ${keyword_part}
      order by nama desc
      ${limit_part}
  `
  return {
    body: {
      items
    }
  }
}
