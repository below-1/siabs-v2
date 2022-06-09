import db from '../../../../db';

export async function get(event) {
  const sql = db();
  const result = await sql`
    update pegawai 
      set id_unit_kerja = NULL
      where 
        nik = ${event.params.nik}
      returning nik
  `;
  return {
    body: {
      message: 'success'
    }
  }
}