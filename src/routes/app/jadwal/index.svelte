<script>
  import { getContext } from 'svelte'
  import PageHeader from '$lib/page-header.svelte'
  import FButton from '$lib/fbutton.svelte'

  const cu = getContext('currentUser')
  const user = cu.getUser()

  function formatDates(fixed, user) {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Makassar',
      dateStyle: 'full'
    })
    return {
      day_start: formatter.format(new Date(fixed.day_start)),
      day_end: formatter.format(new Date(fixed.day_end))
    }
  }

  export let items = []
  $: formatted = items.map(it => {
    console.log(it);
    if (it.jadwal.tipe == 'fixed') {
      return {
        ...it,
        format: formatDates(it.jadwal, user)
      }
    }
    return it
  })
</script>

<PageHeader>
  <div class="flex flex-col md:flex-row justify-between items-center gap-y-2">
    <h1 class="font-black text-3xl">Daftar Jadwal</h1>
    <FButton path="/app/jadwal/create" primary>tambah jadwal</FButton>
  </div>
</PageHeader>

<section class="container px-4">
  {#each formatted as item}
    <a 
      href={`/app/jadwal/${item.jadwal.id}/${item.jadwal.tipe}`}
      class="border-b border-gray-200 py-4 flex flex-col"
    >
      <div class="text-lg flex items-center gap-x-3 font-bold">
        <span>{item.format.day_start}</span>
        <span>-</span>
        <span>{item.format.day_end}</span>
      </div>
      <div class="flex items-center flex-wrap gap-x-4 gap-y-2">
        {#if item.unit_kerja}
          <div class="px-2 py-0.5 bg-gray-200 text-sm font-bold text-gray-600">
            unit kerja: { item.unit_kerja.nama }
          </div>
        {/if}
        {#each item.shifts as shift}
          <div class="px-2 py-0.5 bg-gray-200 text-sm font-bold text-gray-600 flex items-center">
            <span>{shift.waktu_masuk} - {shift.waktu_keluar}</span>
          </div>
        {/each}
      </div>
    </a>
  {/each}
</section>