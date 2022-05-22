import db from '../../../../../db'

export async function get(event) {
  const { id } = event.params;
  const sql = db()
  const pegawai_list = await sql`
    select 
      ab.nik,
        count(ab.nik) as total_masuk,
        count(ab.nik) as total_keluar,
        count(ab.nik) filter (where ab.absen_masuk is null) as alpa_masuk,
        count(ab.nik) filter (where ab.absen_keluar is null) as alpa_keluar,
        json_agg(p)->0 as pegawai
      from absen ab
      left join pegawai p on ab.nik = p.nik
      left join shift sh on sh.id = ab.id_shift
      where sh.id_jadwal = ${id}
      group by ab.nik
      limit 10
  `
  return {
    status: 200,
    body: {
      pegawai_list
    }
  }
}