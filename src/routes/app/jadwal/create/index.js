import db from '../../../../db'
import day from '$lib/day'
import dayindex from '$lib/dayindex'
import { v4 as uuid } from '@lukeed/uuid';

function set_hour(d, hstring) {
  const [ shour, smin ] = hstring.split(':')
  return d.hour(parseInt(shour)).minute(parseInt(smin))
}

async function create_fixed({ fixed, tenant, user, sql }) {
  const exclude_dow = fixed.days
    .map((d, i) => {
      if (!d) return i + 1;
      return null;
    })
    .filter(it => it);

  // Fixed Schedule only have 1 Shift
  // Mark it mutable for we will add jadwal.id into it
  let shift_payload = {
    waktu_masuk: fixed.waktu_masuk,
    waktu_keluar: fixed.waktu_keluar,
    id_tenant: tenant.id
  }

  const result = await sql.begin(async sql => {
    const [ { id: id_jadwal } ] = await sql`
      with 
        days as (
          select generate_series(
            ${fixed.tanggal_awal}::timestamptz, 
            ${fixed.tanggal_akhir}::timestamptz, 
            '1 day'::interval
          ) as d
        ),
        excls as (
          select 
            array_agg(d::date) as exclude_days
            from days 
            where extract('isodow', d) in (
              select unnest(${sql.array(exclude_dow)})::float
            )
        )
        insert into jadwal 
          (tipe, day_start, day_end, exclude_days, id_tenant, id_unit_kerja)
          values (
            'fixed',
            ${new Date(fixed.tanggal_awal)},
            ${new Date(fixed.tanggal_akhir)},
            (select excls.exclude_days from excls),
            ${tenant.id},
            ${fixed.id_unit_kerja}
          )
          returning id
    `
    shift_payload.id_jadwal = id_jadwal
    const [ { id: id_shift } ] = await sql`
      insert into shift ${sql(shift_payload)} returning id
    `
    return {
      id_jadwal,
      id_shift
    }
  });

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
  } else if (tipe == 'shift') {
    throw new Error('TODO: IMPLEMENT SHIFT SCHEDULE CREATION')
  }
  return {
    status: 200,
    body: {
      result
    }
  }
}