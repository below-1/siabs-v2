import db from '../../../../db'

export async function getFixed({ id, user, sql }) {
  const [ jadwal_agg ] = await sql`
    select
      row_to_json(j) as jadwal,
      json_agg(t)->0 as tenant,
      json_agg(uk)->0 as unit_kerja,
      json_agg(shift) as shifts
      from jadwal j
      left join shift on shift.id_jadwal = j.id
      left join tenant t on t.id = j.id_tenant
      left join unit_kerja uk on uk.id = j.id_unit_kerja
      group by j.id
      where j.id = ${id}
      limit 10
  `
  return jadwal_agg
}

export async function get(event) {
  const { user } = event.locals.session
  const id = event.params.id
  
  const sql = db()
  const [ item ] = await sql`
    select
      row_to_json(j) as jadwal,
      json_agg(t)->0 as tenant,
      json_agg(uk)->0 as unit_kerja,
      json_agg(shift) as shifts
      from jadwal j
      left join shift on shift.id_jadwal = j.id
      left join tenant t on t.id = j.id_tenant
      left join unit_kerja uk on uk.id = j.id_unit_kerja
      where j.id = ${id}
      group by j.id
  `
  return {
    status: 200,
    body: {
      item
    }
  }
}