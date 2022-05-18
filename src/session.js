import db from './db'
import redis from './redis'

export async function load(username) {
  const redis_client = redis()
  const session_data_raw = await redis_client.get(username)
  const session_data = JSON.parse(session_data_raw)
  return session_data
}
