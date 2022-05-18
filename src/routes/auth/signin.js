import db from '../../db'
import redis from '../../redis'
import day from '$lib/day'

export async function post(event) {
  const fd = await event.request.formData()
  const username = fd.get('username')
  const password = fd.get('password')
  const sql = db()
  const [ user ] = await sql`select * from "user" where username = ${username}`
  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }
  console.log(user)
  // throw new Error('stop')
  if (user.password != password) {
    throw new Error('PASS_NOT_MATCH')
  }

  const [ tenant ] = await sql`select * from tenant where id = ${user.id_tenant}`
  if (!tenant) {
    throw new Error('TENANT_NOT_FOUND')
  }

  const [ pegawai ] = await sql`select * from pegawai where username = ${user.username}`
  const session_data = {
    user,
    pegawai,
    tenant,
    expired: day().add(1, 'day').toDate(),
  }
  const redis_client = redis()
  await redis_client.set(user.username, JSON.stringify(session_data))
  let cookies = []
  cookies.push(`username=${user.username}; Path=/`)
  return {
    status: 302,
    headers: {
      location: '/app',
      'Set-Cookie': cookies
    }
  }
}
