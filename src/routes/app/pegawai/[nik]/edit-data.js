import db from '../../../../db';

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
  const nik = event.params.nik
  const fd = await event.request.formData()
  let payload = {
    nama: fd.get('nama'),
    nik: fd.get('nik'),
    jenis_kelamin: fd.get('jenis_kelamin'),
    id_unit_kerja: fd.get('id_unit_kerja')
  }
  const tanggal_lahir = fd.get('tanggal_lahir')
  if (tanggal_lahir) {
    payload.tanggal_lahir = new Date(tanggal_lahir)
  }

  const sql = db()

  const [ result ] = await sql`
    update pegawai set ${
      sql(payload)
    } 
      where nik = ${nik}
      returning nik
  `

  return {
    status: 303,
    headers: {
      location: `/app/pegawai/${result.nik}/overview`
    }
  }
}
