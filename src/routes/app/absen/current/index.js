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
    if (diffInMinutes < 30) {
      status = 'in-time';
    } else if (diffInMinutes) {
      status = 'alpa';
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
        status = ${getDifferenceStatus(absen.waktu_masuk, payload.time)}
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
  if (!absen.absen_masuk) {
    await checkIn(absen, payload, sql);
  } else if (!absen.absen_keluar) {
    throw new Error('NOT_IMPLEMENTED');
  } else {
    throw new Error('ABSEN_STATE_INVALID');
  }

  response.body.code = 'SUCCESS_CHECK_IN';
  return response;
}