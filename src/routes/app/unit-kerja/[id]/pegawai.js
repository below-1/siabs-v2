import db from '../../../../db'

export async function get(event) {
  const keyword = event.url.searchParams.get('keyword');
  const sql = db();
  const pegawaiList = await sql`
    select * from pegawai 
      where 
        id_unit_kerja = ${event.params.id}
        ${
          keyword
            ? sql`and nama ilike ${'%' + keyword + '%'}`
            : sql``
        }`;
  return {
    body: {
      items: pegawaiList,
      keyword
    }
  }
}