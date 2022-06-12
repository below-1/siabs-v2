import db from '../../../../db';
import day from '$lib/day';

export async function post(event) {
  const { user } = event.locals.session;
  const { timezone } = user;
  // const timestr = timezone.substring(1, 5);
  // const toff = parseInt(timestr);
  // const offset = timezone.substring(0, 1);
  // const withOffset = offset == '+'
  //   ? (d) => d.subtract(toff, 'hour');
  //   : (d) => d.add(toff, 'hour')

  const payload = await event.request.json();
  const {
    workDays,
    id_unit_kerja,
    tipe
  } = payload;
  const sql = db();
  const niks = await sql`
    select nik from pegawai 
      where id_unit_kerja = ${id_unit_kerja}
  `;

  const payloads = niks
    .map(({ nik }) => {
      let pegawaiAbsenList = [];
      const end = day(payload.end)
      let t = day(payload.start)
        .add(8, 'hour');
      let i = 0;
      while (t.isBefore(end)) {
        const t1 = t.add(10, 'hour');
        const dayOfTheWeek = t.day();

        if (workDays[dayOfTheWeek]) {
          pegawaiAbsenList.push({
            alert_masuk: t.toDate(),
            alert_keluar: t1.toDate(),
            id_unit_kerja,
            nik,
            tipe,
            kode_shift: 1
          });
        }
        t = t.add(1, 'day');
      }
      return pegawaiAbsenList;
    })
    .flat();
  console.log(payloads);
  console.log('payloads');


  const result = await sql`
    insert into absen
      ${sql(payloads)}
  `;

  return {
    status: 200,
    body: {
      message: 'OK'
    }
  }
}