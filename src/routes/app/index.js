export async function get(event) {
  const session = event.locals.session
  console.log('event.locals')
  console.log(event.locals)
  return {
    body: session
  }
}
