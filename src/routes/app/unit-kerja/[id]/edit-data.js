import db from '../../../../db'

export async function post(event) {
  const id = event.params.id
  const fd = await event.request.formData()
  const payload = {
    nama: fd.get('nama')
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
