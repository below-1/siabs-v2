import db from '../../../../../../../db'

export async function get(event) {
  const date = new Date(event.url.searchParams.get('date'))
  const id = event.params.id
  const sql = db()
  const items = await sql`
    select 
      row_to_json(absen) as absen,
      row_to_json(pegawai) as pegawai
      from absen
        join pegawai on
          pegawai.nik = absen.nik
        join shift on 
          (shift.id = absen.id_shift) 
          and (shift.id_jadwal = ${id})
        where (absen.alert_masuk at time zone 'Asia/Makassar')::date = ${date}
  `
  return {
    body: {
      items,
      date
    }
  }
}