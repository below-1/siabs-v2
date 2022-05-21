import db from '../../../../../db'
import day from '$lib/day'

function set_hour(d, hstring) {
  const [ shour, smin ] = hstring.split(':')
  return d.hour(parseInt(shour)).minute(parseInt(smin))
}

export async function post(event) {
  const { id } = event.params;
  const { tenant } = event.locals.session
  const fd = await event.request.formData()
  const id_shift = fd.get('shift')
  const nik = fd.get('nik')
  const tipe = fd.get('work_status')
  const sql = db()

  const [ jadwal ] = await sql`
    select * from jadwal where id = ${id}
  `
  const exclude_days = jadwal.exclude_days
  console.log(exclude_days)
  throw new Error('stop here')

  const day_start = day(jadwal.day_start)
  const day_diff = day(jadwal.tanggal_akhir).diff(day(jadwal.tanggal_awal), 'day') + 1
  Array(day_diff).fill(1)
    .map(it => {
      let d = set_hour(day(fixed.tanggal_awal).add(i, 'day'), fixed.waktu_masuk).toDate()
      return d
    })
    .filter(d => {
      return 
    })

  const [ insert_result ] = await sql`
    insert into absen ${sql({
      id_shift,
      nik,
      id_tenant: tenant.id,
      tipe
    })}
    returning id
  `
  return {
    status: 303,
    headers: {
      location: `/app/jadwal/${id}/fixed/pegawai`
    }
  }
}
