import db from '../../../../../db'

export async function get(event) {
  const { id } = event.params;
  const sql = db()
  const pegawai_list = await sql`
    select p.* 
      from absen ab
      left join pegawai p on ab.nik = p.nik
      left join shift sh on sh.id = ab.id_shift
      where sh.id_jadwal = ${id}
  `
  return {
    status: 200,
    body: {
      pegawai_list
    }
  }
}