import db from '../../db'
import { initialize_tenant } from './tenant'
import { initialize_unit_kerja } from './unit-kerja'
import { initialize_pegawai } from './pegawai'

export async function get(event) {
  const sql = db()
  console.log(sql)
  await sql.begin(async sql => {
    const {
      user,
      tenant
    } = await initialize_tenant({ sql })
    const unit_kerja_list = await initialize_unit_kerja({ sql, tenant })
    const pegawai_list = await initialize_pegawai({ sql, tenant })
  })
  return {
    status: 200,
    body: {
      message: 'OK'
    }
  }
}