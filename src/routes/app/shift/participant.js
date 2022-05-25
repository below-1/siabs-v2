import db from '../../../db'

export async function get(event) {
  const id_shift = event.url.searchParams.get('id_shift')
  const sql = db()
  const items = await sql`
    select 
      row_to_json(ab) as absen,
      row_to_json(p) as pegawai
    from absen ab
      left join pegawai p on p.nik = ab.nik
      where ab.id_shift = ${id_shift}
  `
  return {
    body: {
      items
    }
  }
}