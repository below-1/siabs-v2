import { 
  randProduct, 
  randAlphaNumeric, 
  randFullName, 
  randSentence,
  randBetweenDate,
  randUserName,
  rand
} from '@ngneat/falso';

export async function initialize_pegawai({ sql, tenant }) {
  const jenis_kelamin_options = ['Laki - Laki', 'Perempuan']
  const t0 = new Date('1990-01-01')
  const t1 = new Date('2001-01-01')
  let payloads = []
  let user_payloads = []
  const n = 100
  for (let i = 0; i < n; i++) {
    const nid = i + 1;
    const nama = randFullName()
    const nip = randAlphaNumeric({ length: 10 }).join('')
    const nik = randAlphaNumeric({ length: 10 }).join('')
    const jenis_kelamin = rand(jenis_kelamin_options)
    const tanggal_lahir = randBetweenDate({ 
      from: t0,
      to: t1
    })
    const alamat = randSentence()
    const avatar = `https://i.pravatar.cc/150?img=${nid}`

    const username = randUserName()
    const password = username

    payloads.push({
      nama,
      nip,
      nik,
      avatar,
      tanggal_lahir,
      jenis_kelamin,
      username,
      id_tenant: tenant.id
    })
    user_payloads.push({
      username,
      password,
      id_tenant: tenant.id
    })
  }
  const user_list = await sql`
    insert into "user" ${sql(user_payloads)}
    returning *
  `
  const pegawai_list = await sql`
    insert into pegawai ${sql(payloads)}
    returning *
  `
  return pegawai_list
}