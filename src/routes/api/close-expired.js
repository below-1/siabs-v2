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
  `;
  await sql`
    update absen
      set status_keluar = 
        (case 
          when status_masuk is null then 'alpa'
          when status_masuk = 'alpa' then 'alpa'
          else 'late'
        end)
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