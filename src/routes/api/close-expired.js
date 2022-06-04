import db from '../../db';
import day from '$lib/day';

export async function get(event) {
  const now = new Date();
  const sql = db();

  await sql`
    update absen
      set status_masuk = 'alpa'
      where  
        (alert_masuk + '90 minute'::interval) < ${now}
        and tipe != 'dl'
  `;
  await sql`
    update absen
      set status_keluar = 'alpa'
      where  
        (alert_keluar + '90 minute'::interval) < ${now}
        and tipe != 'dl'
  `;

  return {
    body: {
      message: 'success'
    }
  }
}