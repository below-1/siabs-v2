import db from '../../../../../../db'

export async function post(event) {
  const id_jadwal = event.params.id
  const { tenant } = event.locals.session 
  const fd = await event.request.formData()
  const payload = {
    waktu_masuk: fd.get('waktu_masuk'),
    waktu_keluar: fd.get('waktu_keluar'),
    id_tenant: tenant.id,
    id_jadwal: id_jadwal
  }

  const sql = db()

  const [ result ] = await sql`
    insert into shift ${sql(payload)} returning id
  `

  return {
    status: 303,
    headers: {
      location: `/app/jadwal/${id_jadwal}/shift/shifts`
    }
  }
}
