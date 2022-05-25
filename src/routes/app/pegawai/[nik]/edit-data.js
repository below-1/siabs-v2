import db from '../../../../db'

export async function post(event) {
  const nik = event.params.nik
  const fd = await event.request.formData()
  let payload = {
    nama: fd.get('nama'),
    nip: fd.get('nip'),
    nik: fd.get('nik'),
    jenis_kelamin: fd.get('jenis_kelamin')
  }
  const tanggal_lahir = fd.get('tanggal_lahir')
  if (tanggal_lahir) {
    payload.tanggal_lahir = new Date(tanggal_lahir)
  }

  console.log(payload)
  console.log(nik)
  const sql = db()
  const [ result ] = await sql`
    update pegawai set ${
      sql(payload)
    } 
      where nik = ${nik}
  `

  return {
    status: 303,
    headers: {
      location: `/app/pegawai/${nik}/overview`
    }
  }
}
