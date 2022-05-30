import { randProduct, randSentence, randFullAddress } from '@ngneat/falso';

export async function initialize_unit_kerja({ sql }) {
  let payloads = []
  let satpel_payloads = []
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
      tipe: 'induk'
    })
  }
  for (let i = 0; i < 5; i++) {
    const nid = i + 1;
    const prod = randProduct()
    const nama = prod.title
    const alamat = randFullAddress()
    const avatar = `https://i.pravatar.cc/150?img=${nid}`
    satpel_payloads.push({
      nama,
      alamat,
      avatar,
      tipe: 'satpel'
    })
  }
  const all_payloads = [ ...payloads, ...satpel_payloads ]
  const unit_kerja_list = await sql`
    insert into unit_kerja ${sql(all_payloads)}
    returning *
  `
  return unit_kerja_list
}