import db from '../../../../db'

export async function post(event) {
  const id = event.params.id
  const fd = await event.request.formData()
  const latitude = fd.get('latitude');
  const longitude = fd.get('longitude');
  let payload = {
    nama: fd.get('nama')
  }
  if (latitude) {
    payload.latitude = latitude;
  }
  if (longitude) {
    payload.longitude = longitude;
  }
  const sql = db()
  await sql`
    update unit_kerja set ${sql(payload)}
      where id = ${id}
  `
  return {
    status: 303,
    headers: {
      location: `/app/unit-kerja/${id}/edit-data`
    }
  }
}
