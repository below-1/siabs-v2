import db from '../../../../db'

export async function get(event) {
  const id = event.params.id
  console.log(event.params)
  const sql = db()
  const [ item ] = await sql`
    select 
      row_to_json(ab) as absen,
      row_to_json(p) as pegawai,
      row_to_json(uk) as unit_kerja
    from absen ab 
      left join pegawai p on p.nik = ab.nik
      left join unit_kerja uk on uk.id = ab.id_unit_kerja
    where ab.id = ${id}
  `
  return {
    body: {
      item
    }
  }
}