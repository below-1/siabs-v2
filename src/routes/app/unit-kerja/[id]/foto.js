import db from '../../../../db';
import { upload_image } from '../../../../upload';

export async function post(event) {
  const id = event.params.id;
  const fd = await event.request.formData();

  const avatar_file = fd.get('avatar');
  const avatar = await upload_image(avatar_file);

  const sql = db();
  let response = {
    headers: {}
  };

  try {
    const result = await sql`
      update unit_kerja set 
        avatar = ${avatar}
        where id = ${id}
    `;
    response.status = 302;
    response.headers.location = `/app/unit-kerja/${id}/jadwal`;
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.headers.location = `/app/error`;
  }

  return response;
}