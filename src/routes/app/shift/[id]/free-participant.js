import db from '../../../../db'

export async function get(event) {
  const id_shift = event.params.id
  const keyword = event.url.searchParams.get('keyword')
  const sql = db()
  const keyword_part = keyword ? sql`and nama ilike ${'%' + keyword + '%'}` : sql``
  const items = await sql`
    select *
    from pegawai
      where 
        nik not in (select nik from absen where id_shift = ${id_shift})
        ${keyword_part}
      order by nama desc
      limit 5
  `
  return {
    body: {
      items
    }
  }
}