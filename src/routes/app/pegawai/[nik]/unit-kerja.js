import db from '../../../../db';

export async function post(event) {
  const sql = db();
  const payload = await event.request.json();
  const result = await sql`
    update pegawai 
      set id_unit_kerja = ${payload.id_unit_kerja}
      where 
        nik = ${event.params.nik}
      returning nik, id_unit_kerja
  `;
  return {
    body: {
      message: 'success'
    }
  }
}