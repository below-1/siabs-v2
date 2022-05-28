import db from '../../../../../db';

export async function get(event) {
  const { pegawai } = event.locals.session;
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
      ab.alert_masuk
      from absen ab
        where ab.nik = ${pegawai.nik}
          and ab.alert_masuk > ${now}
          and ab.absen_masuk is null
  `;
  console.log(result);
  if (result.length == 0) {
    response.body.code = 'EMPTY_CHECK_IN';
    return response;
  }
  response.body.code = 'SUCCESS';
  response.body.data = result[0];
  return response;
}