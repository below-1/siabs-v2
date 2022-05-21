<script>
  import { getContext } from 'svelte'
  import PageHeader from '$lib/page-header.svelte'

  const cu = getContext('currentUser')
  const user = cu.getUser()
  console.log('user')
  console.log(user)

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

  export let items = []
  $: formatted = items.map(it => {
    if (it.tipe == 'fixed') {
      return {
        ...it,
        format: formatDates(it, user)
      }
    }
  })
</script>

<PageHeader>
  <div class="flex flex-col md:flex-row justify-between items-center gap-y-2">
    <h1 class="font-black text-3xl">Daftar Jadwal</h1>
  </div>
</PageHeader>

<section class="container px-4">
  {#each formatted as item}
    <a 
      href={ item.tipe == 'fixed' ? `/app/jadwal/${item.group_id}/fixed` : `/app/jadwal/${item.id}/shift` }
      class="px-4 border-b border-gray-200 py-4 flex flex-col"
    >
      <div class="text-lg flex items-center gap-x-3 font-bold">
        <span>{item.format.day_start}</span>
        <span>-</span>
        <span>{item.format.day_end}</span>
      </div>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-gray-600">
        <div class="px-2 py-0.5 rounded bg-gray-200 flex items-center gap-x-2">
          <span>Masuk</span>
          <span>{item.time_start}</span>
        </div>
        <div class="px-2 py-0.5 rounded bg-gray-200 flex items-center gap-x-2">
          <span>Keluar</span>
          <span>{item.time_end}</span>
        </div>
        <div class="px-2 py-0.5 rounded bg-gray-200 flex items-center gap-x-2">
          <span>Unit Kerja</span>
          <span>{item.unit_kerja.nama}</span>
        </div>
      </div>
    </a>
  {/each}
</section>