import db from '../../../db'

export async function get(event) {
  const { pegawai } = event.locals.session
  const sql = db()
  const [ item ] = await sql`
    with abs_wd as (
      select
        (extract(epoch from (current_timestamp() - absen.alert_masuk)) / 60) as in_diff,
        (abs(extract(epoch from (current_timestamp() - absen.alert_masuk))) / 60) as in_abs_diff,

        (extract(epoch from (current_timestamp() - absen.alert_keluar)) / 60) as out_diff,
        (abs(extract(epoch from (current_timestamp() - absen.alert_keluar))) / 60) as out_abs_diff,

        absen.*
      from absen 
        where nik = ${pegawai.nik}
    )
      select * from abs_wd
          where 
            in_abs_diff < 90
            or out_diff > 0
          limit 1
  `;

  console.log(item)
  console.log('item')

  if (item) {
    const in_diff = parseInt(item.in_diff);

    console.log('perbedaan waktu')
    console.log(in_diff)

    let status_masuk = null;
    if (in_diff < 30) {
      status_masuk = 'in-time';
    } else if (in_diff > 30) {
      status_masuk = 'late';
    }

    // console.log(`status = ${status_masuk}`);
    // throw new Error('stop');

    const check_payload = {
      absen_masuk: new Date(),

    }
    const update_result = await sql`
      update absen set
          absen_masuk = ${new Date()},
          status_masuk = ${status_masuk}
        where id = ${item.id}
        returning id
    `
    console.log(update_result)
  }
  return {
    body: {
      item
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