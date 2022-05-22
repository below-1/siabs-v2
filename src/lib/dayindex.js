const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export default function dayindex (timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Makassar',
    weekday: 'long'
  })
  return (d) => {
    const label = formatter.format(d)
    return DAYS.indexOf(label)
  }
}