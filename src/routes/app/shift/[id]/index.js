import db from '../../../../db'

export async function get(event) {
  const id = event.params.id
  const sql = db()
  const [ shift ] = await sql`
    select * from shift 
      where id = ${id}
      limit 1
  `
  return {
    body: {
      item: shift
    }
  }
}

export async function post(event) {
  
}