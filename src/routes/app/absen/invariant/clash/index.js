import db from '../../../../../db';
import { flash } from '../../../../../session';

export async function get(event) {
  const { user } = event.locals.session;
  const { username } = user;
  const key = `${username}:clash`;
  const clashPayload = await flash(key);
  if (!clashPayload) {
    return {
      status: 303,
      hheaders: {
        location: '/app/dashboard'
      }
    }
  }
  // console.log(clashPayload);
  // console.log('clashPayload');

  const ids = clashPayload.items.map(it => it.id);

  const sql = db();
  const items = await sql`
    select 

      ab.id,
      row_to_json(ab) as absen,
      json_agg(p)->0 as pegawai,
      json_agg(uk)->0 as unit_kerja

      from absen ab
        left join unit_kerja uk on uk.id = ab.id_unit_kerja
        left join pegawai p on p.nik = ab.nik
      where ab.id = any(${ids})
      group by ab.id
  `;
  return {
    body: {
      items,
      start: clashPayload.start,
      end: clashPayload.end,
      nik: clashPayload.nik
    }
  }
}