import db from '../../../../db';

export async function get(event) {
  const id = event.params.id;
  const keyword = event.url.searchParams.get('keyword');
  const sql = db();
  const items = await sql`
    select nik, nama, avatar
      from pegawai where nik != ${id}
        ${keyword
          ? sql`and nama ilike ${'%' + keyword + '%'}`
          : sql ``
        }
      limit 5
  `
  return {
    body: {
      items
    }
  }
}