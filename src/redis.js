import { createClient } from 'redis';

let client = null
export default function () {
  if (client) {
    return client
  }
  client = createClient({ url: "rediss://:6b6e58c4236243a196a06b7b5e2ddeca@apn1-amazed-tuna-33092.upstash.io:33092" });
  return client
}
