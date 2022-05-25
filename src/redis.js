import Redis from 'ioredis'

let client = null
export default function () {
  if (client) {
    return client
  }
  // UPSTASH
  // redis-18206.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:18206

  // REDISLAB
  // const cs = "rediss://:6b6e58c4236243a196a06b7b5e2ddeca@apn1-amazed-tuna-33092.upstash.io:33092"
  const cs = process.env.REDIS ? process.env.REDIS : 'redis://127.0.0.1:6379'
  client = new Redis(cs)

  return client
}
