import db from '../../../../db'

export async function get(event) {
  const nik = event.params.nik
  const sql = db()
  const [ data ] = await sql`
    with pegawais as (
      select 
        p.nik,
        p.nip,
        p.nama,
        p.jenis_kelamin,
        p.tanggal_lahir,
        p.avatar,
        u as "user"
        from pegawai p 
        left join "user" u 
          on p.username = u.username
        where p.nik = ${nik}
    )
    select row_to_json(pegawais) as item from pegawais
  `
  return {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: {
      pegawai: data.item
    }
  }
}