import day from '../day'

export function date(jadwal) {
  let result = {...jadwal}
  if (!result.display) {
    result.display = {}
  }
  result.display.hari = day(jadwal.hari).format('dddd, DD MMMM, YYYY')
  result.display.waktu = day(jadwal.waktu).format('[Pukul] HH:mm')
  return result
}