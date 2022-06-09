import db from '../../../../db'

export async function get(event) {
  const sql = db()
  const pegawaiList = await sql`select * from pegawai where id_unit_kerja = ${event.params.id}`
  console.log(pegawaiList);
  console.log('pegawaiList');
  return {
    body: {
      items: pegawaiList
    }
  }
}