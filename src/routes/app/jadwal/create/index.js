import db from '../../../../db'
import day from '$lib/day'
import dayindex from '$lib/dayindex'
import { v4 as uuid } from '@lukeed/uuid';

function set_hour(d, hstring) {
  const [ shour, smin ] = hstring.split(':')
  return d.hour(parseInt(shour)).minute(parseInt(smin))
}

function build_fixed({ payload, id_tenant, user }) {
  // console.log(payload.days)
  // throw new Error('stop')
  const dow_index = dayindex(user.timezone)
  const group_id = uuid();
  const day_diff = day(payload.tanggal_akhir).diff(day(day(payload.tanggal_awal)), 'day') + 1
  return Array(day_diff).fill(1)
    .map((_, i) => {
      let waktu_masuk = set_hour(day(payload.tanggal_awal).add(i, 'day'), payload.waktu_masuk)
      const di = dow_index(waktu_masuk.toDate())
      if (!payload.days[di]) {
        return null;
      }
      let waktu_keluar = set_hour(day(payload.tanggal_awal).add(i, 'day'), payload.waktu_keluar)
      return {
        waktu_masuk: waktu_masuk.toDate(),
        waktu_keluar: waktu_keluar.toDate(),
        id_unit_kerja: payload.id_unit_kerja,
        id_tenant,
        group_id,
        tipe: 'fixed'
      }
    })
    .filter(it => it)
}

export async function post(event) {
  const { tenant, user } = event.locals.session
  const payload = await event.request.json()
  const items = payload.tipe == 'fixed' 
    ? build_fixed({ payload: payload.fixed, id_tenant: tenant.id, user }) 
    : []
  items.forEach(it => {
    const formatter =   new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Makassar',
      dateStyle: 'full'
    })
    console.log(formatter.format(it.waktu_masuk))
  })
  const sql = db()
  await sql`insert into jadwal ${sql(items)}`
  return {
    status: 200,
    body: {
      message: 'OK'
    }
  }
}