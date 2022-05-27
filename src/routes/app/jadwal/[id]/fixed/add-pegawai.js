import db from '../../../../../db'
import day from '$lib/day'

function set_hour(d, hstring) {
  const [ shour, smin ] = hstring.split(':')
  return d.hour(parseInt(shour)).minute(parseInt(smin))
}

export async function get(event) {
  const sql = db()
  const items = await sql`
    select * from pegawai
  `
  return {
    body: {
      pegawaiList: item
    }
  }
}

export async function post(event) {
  const { id } = event.params;
  const { tenant, user } = event.locals.session
  const fd = await event.request.json()
  const id_shift = fd.id_shift
  const nik = fd.nik
  const tipe = fd.tipe
  const sql = db()

  const [ { id: new_id } ] = await sql`
    with 
      dinfo as (
        select day_start as t0, day_end as t1, exclude_days as excl 
          from jadwal where id = ${id}),
      days as (select generate_series(t0, t1, '1 day'::interval) as d from dinfo),
      shifts as (
        select 
          waktu_masuk,
          case
            when waktu_masuk > waktu_keluar then
              ('24:00'::time - waktu_masuk) + (waktu_keluar - '00:00'::time)
          else waktu_keluar - waktu_masuk
          end as hours
          from shift where id_jadwal = ${id}
      )
      insert into absen (alert_masuk, alert_keluar, tipe, id_tenant, id_shift, nik)
        select 
          ((d::date + shifts.waktu_masuk)::string || ${user.timezone})::timestamptz as alert_masuk,
          ((d::date + shifts.waktu_masuk)::string || ${user.timezone})::timestamptz + shifts.hours as alert_keluar,
          ${tipe} as tipe,
          ${tenant.id} as id_tenant,
          ${id_shift} as id_shift,
          ${nik} as nik
          from days, shifts
          where d::date not in (select unnest(excl)::date as e from dinfo)
        returning id
  `

  return {
    status: 201,
    body: {
      message: 'ok'
    }
  }
}
