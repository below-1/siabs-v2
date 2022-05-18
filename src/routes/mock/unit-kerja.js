import { randProduct, randSentence, randFullAddress } from '@ngneat/falso';

export async function initialize_unit_kerja({ sql, tenant }) {
  let payloads = []
  const n = 10
  for (let i = 0; i < n; i++) {
    const nid = i + 1;
    const prod = randProduct()
    const nama = prod.title
    const alamat = randFullAddress()
    const avatar = `https://i.pravatar.cc/150?img=${nid}`
    payloads.push({
      nama,
      alamat,
      avatar,
      id_tenant: tenant.id
    })
  }
  const unit_kerja_list = await sql`
    insert into unit_kerja ${sql(payloads)}
    returning *
  `
  return unit_kerja_list
}