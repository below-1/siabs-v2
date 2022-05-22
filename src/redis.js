import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://apn1-amazed-tuna-33092.upstash.io',
  token: 'AYFEASQgMWZkODM1MjgtMmQ3Zi00OWQ5LTg3ZjktYTM5YzJjOGY1MzljNmI2ZTU4YzQyMzYyNDNhMTk2YTA2YjdiNWUyZGRlY2E=',
})

export default function () {
  return redis;
}
