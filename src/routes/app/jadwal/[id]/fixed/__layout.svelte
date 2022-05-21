<script>
  import { getContext } from 'svelte'
  import PageHeader from '$lib/page-header.svelte'

  const item = getContext('item')
  const cu = getContext('currentUser')
  const user = cu.getUser()

  function formatDates(item, user) {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: user.timezone,
      dateStyle: 'full'
    })
    return {
      day_start: formatter.format(new Date(item.jadwal.day_start)),
      day_end: formatter.format(new Date(item.jadwal.day_end))
    }
  }

  const dates_formatted = formatDates(item, user)
</script>

<PageHeader>
  <div>
    <div class="text-sm text-gray-600">{item.jadwal.id}</div>
    <div class="text-lg flex items-center gap-x-3 font-bold">
      <span>{dates_formatted.day_start}</span>
      <span>-</span>
      <span>{dates_formatted.day_end}</span>
    </div>
  </div>
</PageHeader>

<div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-black">
  <div class="container px-4 flex items-center gap-x-4 py-2">
    <a 
      href={`/app/jadwal/${item.jadwal.id}/overview`}
      class="py-1 px-4 bg-purple-700 rounded shadow-xl"
    >overview</a>
    <a 
      href={`/app/jadwal/${item.jadwal.id}/pegawai`}
      class="py-1 px-4 bg-purple-700 rounded shadow-xl"
    >pegawai</a>
    <a 
      href={`/app/jadwal/${item.jadwal.id}/edit`}
      class="py-1 px-4 bg-purple-700 rounded shadow-xl"
    >edit</a>
  </div>
</div>

<slot></slot>