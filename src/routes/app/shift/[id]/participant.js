import db from '../../../../db'
import day from '$lib/day'

export async function get(event) {
  const { user } = event.locals.session
  const id_shift = event.params.id
  const date = day(event.url.searchParams.get('date')).format('YYYY-MM-DD')
  const sql = db()
  const items = await sql`
    select 
      row_to_json(ab) as absen,
      row_to_json(p) as pegawai
    from absen ab
      left join pegawai p on p.nik = ab.nik
      where 
        ab.id_shift = ${id_shift}
        and ab.alert_masuk::date = ${date}::date
  `
  return {
    body: {
      items
    }
  }
}