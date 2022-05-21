import db from '../../../db'

export async function get(event) {
  const { user } = event.locals.session
  const sql = db()
  let response = {}

  const items = await sql`
    select
      j.group_id,
      j.tipe,
      json_agg(distinct t)->0 as tenant,
      json_agg(distinct uk)->0 as unit_kerja,
      min(j.waktu_masuk) as day_start,
      max(j.waktu_keluar) as day_end,
      array_agg(distinct (j.waktu_masuk at time zone ${user.timezone})::time)[1] as time_start,
      array_agg(distinct (j.waktu_keluar at time zone ${user.timezone})::time)[1] as time_end

      from jadwal j

      left join tenant t on t.id = j.id_tenant
      left join unit_kerja uk on uk.id = j.id_unit_kerja
      group by j.group_id, j.tipe
      limit 10
  `
  response.status = 200
  response.body = {}
  response.body.items = items
  return response
}