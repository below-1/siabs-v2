const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    dateStyle: 'full',
    timeStyle: 'full'
})

const d = new Date('2022-01-30')

console.log(formatter.format(d))
