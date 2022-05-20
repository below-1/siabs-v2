import day from '$lib/day'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import weekday from 'dayjs/plugin/weekday'

day.extend(utc)
day.extend(timezone)
day.extend(weekday)

export async function get(event) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Pacific/Apia',
    weekday: 'long'
  })
  for (let i = 0; i < 7; i++) {
    const n = day(new Date())
    const d = n.add(i, 'day').toDate()
    console.log(formatter.format(d))
  }
  throw new Error('stop')
}