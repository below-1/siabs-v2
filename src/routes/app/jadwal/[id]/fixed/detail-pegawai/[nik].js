import db from '../../../../../../db'

export async function get(event) {
  const nik = event.params.nik
  const id = event.params.id

  const sql = db()

  const [ absen_data ] = await sql`
    select 
        ab.nik,
        count(ab.nik) as total_masuk,
        count(ab.nik) as total_keluar,
        count(ab.nik) filter (where ab.absen_masuk is null) as alpa_masuk,
        count(ab.nik) filter (where ab.absen_keluar is null) as alpa_keluar,
        json_agg(p)->0 as pegawai,
        json_agg(ab) as absen
      from absen ab
      left join pegawai p on ab.nik = p.nik
      left join shift sh on sh.id = ab.id_shift
      where sh.id_jadwal = ${id} and ab.nik = ${nik}
      group by ab.nik
      limit 1
  `

  console.log('absen_data')
  console.log(absen_data)

  return {
    body: {
      absen_data
    }
  }
}