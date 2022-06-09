import postgres from 'postgres'

let sql = null

export default function () {
  if (sql) {
    return sql
  }
  const DEFAULT_PG_URI = 'postgresql://root@old-junk:26257/absensi_db?sslmode=disable'
  const PG_URI = process.env.PG_URI ? process.env.PG_URI : DEFAULT_PG_URI
  // const PG_URI = 'postgresql://below_1:Y-hzj59hiQpCdmW14hHsaQ@free-tier8.aws-ap-southeast-1.cockroachlabs.cloud:26257/absensi_db?sslmode=verify-full&options=--cluster%3Dproper-gull-1748'
  sql = postgres(PG_URI, {
    prepare: false,
    max: 1,
  })

  return sql
}
