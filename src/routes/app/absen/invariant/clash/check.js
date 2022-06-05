import db from '../../../../../db';
import { flash } from '../../../../../session';

export async function post(event) {
  const { user } = event.locals.session;
  if (!user) {
    throw new Error('user not defined');
  }
  const { username } = user;
  const payload = await event.request.json();
  const { nik } = payload;
  const start = new Date(payload.start);
  const end = new Date(payload.end);
  const sql = db();
  const result = await sql`
    select id
      from absen
        where 
          nik = ${nik}
          and (
            (
              alert_masuk <= ${start}
              and alert_keluar > ${start}
            )
            or
            (
              alert_masuk <= ${end}
              and alert_keluar > ${end} 
            )
          )
  `;
  let response = {
    status: 200,
    body: {
      message: 'OKAY'
    }
  }

  if (result.length > 0) {
    const key = `${username}:clash`;
    const flashPayload = {
      start,
      end,
      nik,
      items: result
    }
    await flash(key, flashPayload);
    response.status = 200;
    response.body.message = 'CLASH';
    response.body.id = key;
    return response;
  } else {
    return response;
  }

}