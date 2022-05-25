import db from '../../../../../../../db'

export async function get(event) {
  const nik = event.params.nik
  const id = event.params.id

  const sql = db()

  const [ absen_data ] = await sql`
    with sh_ctx as (
      select * from shift where id_jadwal = ${id} limit 1
    ),
    absen_ctx as (
      select * 
        from absen 
        join sh_ctx on sh_ctx.id = id_shift
        where 
          id_shift = sh_ctx.id and
          nik = ${nik}
        order by alert_masuk desc
        limit 10
    ),
    pegawai_ctx as (
      select * from pegawai where nik = ${nik}
    )
    select 
      json_agg(p)->0 as pegawai,
      json_agg(ab) as absen
      from 
        pegawai_ctx p, absen_ctx ab
  `

  return {
    body: {
      absen_data
    }
  }
}