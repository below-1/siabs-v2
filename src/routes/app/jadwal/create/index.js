import db from '../../../../db'
import day from '$lib/day'
import dayindex from '$lib/dayindex'
import { v4 as uuid } from '@lukeed/uuid';

function set_hour(d, hstring) {
  const [ shour, smin ] = hstring.split(':')
  return d.hour(parseInt(shour)).minute(parseInt(smin))
}

async function create_dl({ dl, tenant, user, sql }) {
  const date = set_hour(day(dl.tanggal), dl.waktu)
  const jadwalPayload = {
    day_start: date.toDate(),
    day_end: date.toDate(),
    tipe: 'dl',
    id_tenant: tenant.id,
    lat_dl: dl.lat_dl,
    lng_dl: dl.lng_dl
  }
  let shiftPayload = {
    waktu_masuk: dl.waktu,
    waktu_keluar: dl.waktu
  }
}

async function create_fixed({ fixed, tenant, user, sql }) {
  const exclude_dow = fixed.days
    .map((d, i) => {
      if (!d) return i + 1;
      return null;
    })
    .filter(it => it);

  const excludeDateParts = exclude_dow.length == 0 
    ? sql`array[]::int[]` 
    : sql`${sql.array(exclude_dow)}`;

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
              select unnest(${excludeDateParts})::float
            )
        )
        insert into jadwal 
          (tipe, day_start, day_end, exclude_days, id_tenant, id_unit_kerja)
          values (
            'fixed',
            ${new Date(fixed.tanggal_awal)},
            ${new Date(fixed.tanggal_akhir)},
            coalesce((select excls.exclude_days from excls), array[]),
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

  return result;
}

async function create_shift({ shift, tenant, user, sql }) {
  const exclude_dow = shift.days
    .map((d, i) => {
      if (!d) return i + 1;
      return null;
    })
    .filter(it => it);

  const data = {
    day_start: new Date(shift.day_start),
    day_end: new Date(shift.day_end),
    id_tenant: tenant.id,
    id_unit_kerja: shift.id_unit_kerja,
    tipe: 'shift'
  };

  const excludeDateParts = exclude_dow.length == 0 
    ? sql`array[]::int[]` 
    : sql`${sql.array(exclude_dow)}`;

  const [{ id: id_jadwal }] = await sql`
    with 
      days as (
        select generate_series(
          ${shift.tanggal_awal}::timestamptz, 
          ${shift.tanggal_akhir}::timestamptz, 
          '1 day'::interval
        ) as d
      ),
      excls as (
        select 
          array_agg(d::date) as exclude_days
          from days 
          where extract('isodow', d) in (
            select unnest(${excludeDateParts})::float
          )
      )
      insert into jadwal 
        (
          tipe, 
          day_start, 
          day_end, 
          exclude_days, 
          id_tenant, 
          id_unit_kerja
        )
        values (
          'shift',
          ${new Date(shift.tanggal_awal)},
          ${new Date(shift.tanggal_akhir)},
          coalesce((select excls.exclude_days from excls), array[]),
          ${tenant.id},
          ${shift.id_unit_kerja}
        )
        returning id
  `
  return { id_jadwal }
}

export async function post(event) {
  const { tenant, user } = event.locals.session
  const payload = await event.request.json()

  const sql = db()

  const { tipe } = payload
  let result = null

  if (tipe == 'fixed') {
    result = await create_fixed({
      user,
      tenant,
      fixed: payload.fixed,
      sql
    })
  } else if (tipe == 'shift') {
    result = await create_shift({
      user,
      tenant,
      shift: payload.shift,
      sql
    })
  }
  return {
    status: 200,
    body: {
      ...result
    }
  }
}