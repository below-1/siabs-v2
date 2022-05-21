import db from '../../../../db'
import day from '$lib/day'
import dayindex from '$lib/dayindex'
import { v4 as uuid } from '@lukeed/uuid';

function set_hour(d, hstring) {
  const [ shour, smin ] = hstring.split(':')
  return d.hour(parseInt(shour)).minute(parseInt(smin))
}

async function create_fixed({ fixed, tenant, user, sql }) {
  const dow_index = dayindex(user.timezone)
  const day_diff = day(fixed.tanggal_akhir).diff(day(fixed.tanggal_awal), 'day') + 1
  const exclude_days = Array(day_diff).fill(1)
    .map((_, i) => {
      let d = set_hour(day(fixed.tanggal_awal).add(i, 'day'), fixed.waktu_masuk).toDate()
      return d
    })
    .filter(d => {
      const weekday = dow_index(d)
      return !fixed.days[weekday]
    })

  const jadwal_payload = {
    tipe: 'fixed',
    day_start: new Date(fixed.tanggal_awal),
    day_end: new Date(fixed.tanggal_akhir),
    exclude_days,
    id_tenant: tenant.id,
    id_unit_kerja: fixed.id_unit_kerja
  }

  // Fixed Schedule only have 1 Shift
  // Mark it mutable for we will add jadwal.id into it
  let shift_payload = {
    waktu_masuk: fixed.waktu_masuk,
    waktu_keluar: fixed.waktu_keluar,
    id_tenant: tenant.id
  }

  const exclude_days_string = exclude_days.map(d => "'" + d.toISOString() + "'")

  const result = await sql.begin(async sql => {
    const [ { id: id_jadwal } ] = await sql`
      insert into jadwal
        (tipe, day_start, day_end, exclude_days, id_tenant, id_unit_kerja)
        values (
          'fixed', 
          ${jadwal_payload.day_start},
          ${jadwal_payload.day_end},
          ${sql.array(exclude_days)},
          ${tenant.id},
          ${jadwal_payload.id_unit_kerja}
        )
      returning id
    `
    shift_payload.id_jadwal = id_jadwal
    const [ id_shift ] = await sql`
      insert into shift ${sql(shift_payload)} returning id
    `
    return {
      id_jadwal,
      id_shift
    }
  })

  return result
}

export async function post(event) {
  const { tenant, user } = event.locals.session
  const payload = await event.request.json()

  const sql = db()

  const { tipe } = payload
  let result = null;
  if (tipe == 'fixed') {
    result = await create_fixed({
      user,
      tenant,
      fixed: payload.fixed,
      sql
    })
  }
  throw new Error('TODO: IMPLEMENT SHIFT SCHEDULE CREATION')
  return {
    status: 200,
    body: {
      message: 'OK'
    }
  }
}