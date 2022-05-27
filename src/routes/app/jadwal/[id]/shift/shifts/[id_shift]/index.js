import db from '../../../../../../../db'

export async function get(event) {
  const {
    id_shift
  } = event.params;
  const sql = db();
  const absenList = await sql`
    select id, alert_masuk, alert_keluar 
      from absen 
      where 
        absen_masuk is null 
        and absen_keluar is null
        and id_shift = ${id_shift}
  `
  return {
    body: {
      id_shift: event.params.id_shift,
      absenList
    }
  }
}

export async function post(event) {
  const {
    id_shift
  } = event.params;
  const { 
    waktu_masuk, 
    waktu_keluar,
    absenList
  } = await event.request.json();
  const sql = db();

  await sql.begin(async sql => {
    await sql`
      update shift 
        set 
          waktu_masuk = ${waktu_masuk},
          waktu_keluar = ${waktu_keluar}
        where id = ${id_shift}
    `
    // Update absen
    const promises = absenList.map(absen => {
      sql`
        update absen set 
          alert_masuk = ${new Date(absen.alert_masuk)},
          alert_keluar = ${new Date(absen.alert_keluar)}
          where id = ${absen.id}
      `
    })
    await Promise.all(promises);
  });

  return {
    body: {
      message: 'ok'
    }
  } 
}

