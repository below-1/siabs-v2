import db from '../../../db'
import { upload_image } from '../../../upload'

export async function get(event) {
  const sql = db()
  const unitKerjaList = await sql`
    select * from unit_kerja
  `;
  return {
    body: {
      unitKerjaList
    }
  }
}

export async function post(event) {
  const session = event.locals.session;
  const data = await event.request.formData();

  let pegawai_payload = {
    nama: data.get('nama'),
    nik: data.get('nik'),
    nip: data.get('nik'),
    jenis_kelamin: data.get('jenis_kelamin'),
    tanggal_lahir: new Date(data.get('tanggal_lahir')),
    id_unit_kerja: data.get('id_unit_kerja')
  }
  const avatar_file = data.get('avatar');
  if (avatar_file) {
    const avatar = await upload_image(avatar_file);
    pegawai_payload.avatar = avatar;
  } else {
    pegawai_payload.avatar = `/user.jpg`;
  }

  let username = data.get('username');
  username = username ? username : pegawai_payload.nik;
  let password = data.get('password');
  password = password ? password : pegawai_payload.nik;

  let user_payload = {
    username,
    password,
    timezone: data.get('timezone')
  }

  const sql = db()

  const result = await sql.begin(async sql => {
    const [ user ] = await sql`
      insert into "user" ${sql(user_payload)} returning *
    `
    pegawai_payload.username = user.username;
    const [ pegawai ] = await sql`
      insert into pegawai ${sql(pegawai_payload)} returning *
    `
    return {
      user,
      pegawai
    }
  })

  console.log(result)

  return {
    status: 303,
    headers: {
      location: '/app/pegawai'
    }
  }
}