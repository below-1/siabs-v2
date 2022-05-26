<script>
  import { getContext } from 'svelte'
  import PageHeader from '$lib/page-header.svelte'
  import FButton from '$lib/fbutton.svelte'
  import ListItem from './_list-item.svelte'

  const cu = getContext('currentUser')
  const user = cu.getUser()

  function formatDates(d, user) {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Makassar',
      dateStyle: 'full'
    })
    return {
      day_start: formatter.format(new Date(d.day_start)),
      day_end: formatter.format(new Date(d.day_end))
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
    } else if (it.jadwal.tipe == 'shift') {
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

<section class="container">
  {#each formatted as item}
    <ListItem item={item} />
  {/each}
</section>
