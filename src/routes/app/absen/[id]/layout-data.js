import db from '../../../../db'

export async function get(event) {
  const id = event.params.id
  const sql = db()
  const [ item ] = await sql`
    select 
      row_to_json(ab) as absensi,
      row_to_json(p) as pegawai,
      row_to_json(s) as shift,
      row_to_json(j) as jadwal,
      row_to_json(uk) as unit_kerja
    from absensi ab 
      left join pegawai p on p.nik = ab.nik
      left join shift s on s.id_shift = ab.id_shift
      left join jadwal j on s.id_jadwal = j.id
      left join unit_kerja uk on uk.id = j.id_unit_kerja
    where ab.id = ${id}
  `
  return {
    body: {
      item
    }
  }
}