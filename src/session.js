import db from './db'
import redis from './redis'

export async function load(username) {
  const redis_client = redis();
  const session_data_raw = await redis_client.get(username)
  const session_data = JSON.parse(session_data_raw)
  return session_data
}

export async function flash(key, value) {
  const redis_client = redis();
  if (!value) {
    // Get value by key
    const result = await redis_client.get(key);
    return JSON.parse(result);
  } else {
    // Set key to value
    await redis_client.set(key, JSON.stringify(value));
    await redis_client.expire(key, 300);
  }
}