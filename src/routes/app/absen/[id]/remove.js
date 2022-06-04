import db from '../../../../db';

export async function get(event) {
  let response = {
    status: 200,
    body: {}
  };
  const id = event.params.id;
  const redirect = event.url.searchParams.get('redirect');
  const sql = db()
  const [ result ] = await sql`
    delete from absen where id = ${id}
      returning id
  `;
  if (redirect) {
    response.status = 303;
    response.headers = {
      location: redirect
    };
  } else {
    response.body.message = 'success';
  }
  return response;
}