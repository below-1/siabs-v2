import db from '../../../db'
import { upload_image } from '../../../upload'

export async function post(event) {
  const session = event.locals.session
  const tenant = session.tenant

  const data = await event.request.formData();

  let pegawai_payload = {
    nama: data.get('nama'),
    nik: data.get('nik'),
    nip: data.get('nip'),
    jenis_kelamin: data.get('jenis_kelamin'),
    tanggal_lahir: new Date(data.get('tanggal_lahir')),
    id_tenant: tenant.id
  }
  const avatar_file = data.get('avatar')
  const avatar = await upload_image(avatar_file)
  pegawai_payload.avatar = avatar;

  let username = data.get('username')
  username = username ? username : payload.nik
  let password = data.get('password')
  password = password ? password : payload.nik

  let user_payload = {
    username,
    password,
    id_tenant: tenant.id,
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