import db from '../../../../db'
import day from '$lib/day'
import { v4 as uuid } from '@lukeed/uuid';

function set_hour(d, hstring) {
  const [ shour, smin ] = hstring.split(':')
  return d.hour(parseInt(shour)).minute(parseInt(smin))
}

function build_fixed(payload, id_tenant) {
  const group_id = uuid();
  const day_diff = day(payload.tanggal_akhir).diff(day(day(payload.tanggal_awal)), 'day') + 1
  return Array(day_diff).fill(1).map((_, i) => {
    const t0 = set_hour(day(payload.tanggal_awal), payload.waktu_masuk).add(i, 'day')
    const t1 = set_hour(day(payload.tanggal_awal), payload.waktu_keluar).add(i, 'day')
    return {
      waktu_masuk: t0.toDate(),
      waktu_keluar: t1.toDate(),
      id_unit_kerja: payload.id_unit_kerja,
      id_tenant,
      group_id
    }
  })
}

export async function post(event) {
  const { tenant } = event.locals.session
  const payload = await event.request.json()
  const items = payload.tipe == 'fixed' ? build_fixed(payload.fixed, tenant.id) : []
  console.log(items)
  throw new Error('stop')

  const sql = db()
  await sql`insert into jadwal ${sql(items)}`
  return {
    status: 303,
    headers: {
      
    }
  }
}