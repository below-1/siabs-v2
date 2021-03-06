import db from '../../../db'
import { upload_image } from '../../../upload'

export async function post(event) {
  const data = await event.request.formData();
  const session = event.locals.session
  let payload = {
    nama: data.get('nama'),
    alamat: data.get('alamat'),
    latitude: data.get('latitude'),
    longitude: data.get('longitude'),
    tipe: data.get('tipe')
  }

  const avatar_file = data.get('avatar')
  if (avatar_file) {
    const avatar = await upload_image(avatar_file)
    payload.avatar = avatar
  }

  const sql = db()
  const [unit_kerja] = await sql`
    insert into unit_kerja ${
      sql(payload)
    }
    returning *
  `
  console.log(unit_kerja)

  return {
    status: 303,
    headers: {
      location: '/app/unit-kerja'
    }
  }
}
