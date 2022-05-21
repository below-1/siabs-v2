import db from '../../../../db'

export async function get(event) {
  const sql = db()
  const { user } = event.locals.session
  const gid = event.params.id
  const [ jadwal_agg ] = await sql`
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
      where j.group_id = ${gid}
      group by j.group_id, j.tipe
      limit 1
  `
  return {
    body: {
      jadwal: jadwal_agg
    }
  }
  throw new Error('MAKE IT RIGHT: get jadwal group aggregate data')
}
