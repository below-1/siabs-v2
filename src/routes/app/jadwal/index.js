import db from '../../../db'

export async function get(event) {
  const { user, tenant } = event.locals.session
  const sql = db()
  let response = {}

  const items = await sql`
    select

      row_to_json(j) as jadwal,
      json_agg(t)->0 as tenant,
      json_agg(uk)->0 as unit_kerja,
      json_agg(shift) as shifts

      from jadwal j
        left join shift on shift.id_jadwal = j.id
        left join tenant t on t.id = j.id_tenant
        left join unit_kerja uk on uk.id = j.id_unit_kerja

      where j.id_tenant = ${tenant.id}
      group by j.id
      limit 10
  `
  console.log(items)
  response.status = 200
  response.body = {}
  response.body.items = items
  return response
}