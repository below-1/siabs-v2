<script>
  import { getContext } from 'svelte'
  import PageHeader from '$lib/page-header.svelte'

  const fixed = getContext('fixed')
  const cu = getContext('currentUser')
  const user = cu.getUser()

  function formatDates(fixed, user) {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: user.timezone,
      dateStyle: 'full'
    })
    return {
      day_start: formatter.format(new Date(fixed.day_start)),
      day_end: formatter.format(new Date(fixed.day_end))
    }
  }

  const dates_formatted = formatDates(fixed, user)
</script>

<PageHeader>
  <div>
    <div class="text-sm text-gray-600">{fixed.group_id}</div>
    <div class="text-lg flex items-center gap-x-3 font-bold">
      <span>{dates_formatted.day_start}</span>
      <span>-</span>
      <span>{dates_formatted.day_end}</span>
    </div>
    <div class="flex items-center gap-x-4 text-sm font-bold text-gray-600">
      <div class="px-2 py-0.5 rounded bg-gray-200 flex items-center gap-x-2">
        <span>Masuk</span>
        <span>{fixed.time_start}</span>
      </div>
      <div class="px-2 py-0.5 rounded bg-gray-200 flex items-center gap-x-2">
        <span>Keluar</span>
        <span>{fixed.time_end}</span>
      </div>
      <div class="px-2 py-0.5 rounded bg-gray-200 flex items-center gap-x-2">
        <span>Unit Kerja</span>
        <span>{fixed.unit_kerja.nama}</span>
      </div>
    </div>
  </div>
</PageHeader>

<div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-black">
  <div class="container px-4 flex items-center gap-x-4 py-2">
    <a 
      href={`/app/jadwal/${fixed.group_id}/overview`}
      class="py-1 px-4 bg-purple-700 rounded shadow-xl"
    >overview</a>
    <a 
      href={`/app/jadwal/${fixed.group_id}/pegawai`}
      class="py-1 px-4 bg-purple-700 rounded shadow-xl"
    >pegawai</a>
    <a 
      href={`/app/jadwal/${fixed.group_id}/edit`}
      class="py-1 px-4 bg-purple-700 rounded shadow-xl"
    >edit</a>
  </div>
</div>

<slot></slot>