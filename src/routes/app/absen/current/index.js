import db from '../../../../db';
import day from '$lib/day';

function getDifferenceStatus(expectedTime, actualTime) {
  let status = null;
  if (day(expectedTime).isBefore(day(actualTime))) {
    const diffInMinutes = day(actualTime).diff(expectedTime, 'minute');
    if (diffInMinutes < 30) {
      status = 'in-time';
    } else if (diffInMinutes) {
      status = 'late';
    }
  } else {
    const diffInMinutes = day(expectedTime).diff(actualTime, 'minute');
    if (diffInMinutes < 60) {
      status = 'in-time';
    } else if (diffInMinutes) {
      throw new Error('TOO_EARLY');
    }
  }
  return status;
}

async function checkIn(absen, payload, sql) {
  return await sql`
    update absen
      set
        lat_masuk = ${payload.latitude},
        lng_masuk = ${payload.longitude},
        absen_masuk = ${payload.time},
        status_masuk = ${getDifferenceStatus(absen.alert_masuk, payload.time)}
      where id = ${absen.id}
  `;
}

async function checkOut(absen, payload, sql) {
  const time = day(payload.time);
  const alert_masuk = day(absen.alert_keluar);

  // Halt the execution if pegawai try
  // to change absen status BEFORE the expected time
  if (time.isBefore(alert_masuk)) {
    throw new Error('CHECK_OUT_BEFORE');
  }

  return await sql`
    update absen
      set
        lat_keluar = ${payload.latitude},
        lng_keluar = ${payload.longitude},
        absen_keluar = ${payload.time},
        status_keluar = ${getDifferenceStatus(absen.alert_keluar, payload.time)}
      where id = ${absen.id}
  `;
}

export async function post(event) {
  let response = {
    status: 200,
    body: {}
  };
  const payload = await event.request.json();
  const { 
    user,
    pegawai
  } = event.locals.session;
  const sql = db();

  const absenCandidates = await sql`
    select 
      (alert_masuk - ${payload.time}) as diff,
      absen.* 
      from absen
      where 
        nik = ${pegawai.nik}
        and (alert_masuk - interval '1 hour') < ${payload.time}
        and (alert_keluar + interval '1 hour') > ${payload.time}
        and (absen_masuk is null or absen_keluar is null)
      order by diff
  `;
  if (absenCandidates.length == 0) {
    response.body.code = 'EMPTY_URGENT';
    return response;
  }
  const absen = absenCandidates[0];

  console.log(absen);
  console.log('absen');

  // Check in absen
  try {
    if (!absen.absen_masuk) {
      await checkIn(absen, payload, sql);
    } else if (!absen.absen_keluar) {
      await checkOut(absen, payload, sql);
    } else {
      throw new Error('ABSEN_STATE_INVALID');
    }
    response.body.code = 'SUCCESS_CHECK_IN';
    return response;
  } catch (err) {
    console.log(err);
    if (err.message) {
      response.body.code = err.message;
    } else {
      response.body.code = 'ERROR';
    }
    return response;
  }
}

async function getWFOandWFHAbsen(now, nik, sql) {
  const items = await sql`
    with absen_ctx as (
      select * 
      from absen
      where 
        nik = ${nik}
        and alert_masuk < (${now} + interval '1 hour')
        and alert_masuk > (${now} - interval '1 day')
        and (status_masuk is null or status_keluar is null)
    )
      select 
        from absen_ctx
          where 
            alert_masuk < (${now} + interval '1 hour')
    select * 
      from absen
      where 
        nik = ${nik}
        or (
          (alert_masuk - interval '1 hour') < ${payload.time}
          and (alert_masuk + interval '1 hour') > ${payload.time}
        )
         (alert_keluar + interval '1 hour') > ${payload.time}
        and (
          absen_masuk is null
          or absen_keluar is null)
  `;
  return items;
}

async function getDLAbsen(now, nik, sql) {

}

export async function get(event) {
  const { pegawai } = event.locals.session;
  const { nik } = pegawai;
  const nowParam = event.url.searchParams.get('now');
  if (!nowParam) {
    throw new Error('[now] param must be provided');
  }
  const now = new Date(nowParam);
  const sql = db();

  const items = await sql`
    select 
      (alert_masuk - ${now}) as diff,
      absen.* 
      from absen
      where 
        nik = ${nik}
        and (alert_masuk - interval '1 hour') < ${now}
        and (alert_keluar + interval '1 hour') > ${now}
        and (absen_masuk is null or absen_keluar is null)
      order by diff
  `;
  return {
    body: {
      items
    }
  }
}