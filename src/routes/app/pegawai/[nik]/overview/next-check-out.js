import db from '../../../../../db';

export async function get(event) {
  const nik = event.params.nik;
  const now = new Date();
  let response = {
    body: {},
    status: 200,
  };
  const sql = db();
  const result = await sql`
    select 
      ab.id, 
      ab.tipe, 
      ab.alert_keluar
      from absen ab
        where ab.nik = ${nik}
          and ab.alert_keluar >= ${now}
          and ab.absen_keluar is null
        order by ab.alert_keluar asc
        limit 1
  `;
  console.log(result);
  if (result.length == 0) {
    response.body.code = 'EMPTY_CHECK_OUT';
    return response;
  }
  response.body.code = 'SUCCESS';
  response.body.data = result[0];
  return response;
}