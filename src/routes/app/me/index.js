import db from '../../../db';
import day from '$lib/day';

export async function get(event) {
  const { pegawai } = event.locals.session
  const sql = db()
  const [ item ] = await sql`
    select 
        *
      from absen
        where 
          (
            (alert_masuk - '60 minute'::interval) < current_timestamp()
            and (alert_masuk + '30 minute'::interval) > current_timestamp()
          )
          or (
            alert_keluar < current_timestamp()
            and (alert_keluar + '190 minute'::interval) > current_timestamp()
          )
  `;

  if (item) {
    if (!item.absen_masuk)  {
      let diff = parseInt(day(item.alert_masuk).diff(day(new Date()), 'hour'))
      diff = Math.abs(diff)
      let status_masuk = null;
      if (diff < 30) {
        status_masuk = 'in-time';
      } else if (diff > 30) {
        status_masuk = 'late';
      }

      const check_payload = {
        absen_masuk: new Date(),
        status_masuk
      }
      const update_result = await sql`
        update absen set
            ${sql(check_payload)}
          where id = ${item.id}
          returning id
      `
      return {
        body: {
          ...update_result
        }
      }
    } else if (!item.absen_keluar) {
      let diff = parseInt(day(item.alert_keluar_masuk).diff(day(new Date()), 'hour'))
      diff = Math.abs(diff)
      let status_keluar = null;
      if (diff < 30) {
        status_keluar = 'in-time';
      } else if (diff > 30) {
        status_keluar = 'late';
      }

      const check_payload = {
        absen_keluar: new Date(),
        status_keluar
      }
      const update_result = await sql`
        update absen set
            ${sql(check_payload)}
          where id = ${item.id}
          returning id
      `
      return {
        body: {
          ...update_result
        }
      }
    }
  }

  if (pegawai) {
    return {
      status: 303,
      headers: {
        location: `/app/pegawai/${pegawai.nik}/overview`
      }
    }
  }
}