import Redis from 'ioredis'

const client = new Redis("rediss://:6b6e58c4236243a196a06b7b5e2ddeca@apn1-amazed-tuna-33092.upstash.io:33092");
export default function () {
  return client
}
