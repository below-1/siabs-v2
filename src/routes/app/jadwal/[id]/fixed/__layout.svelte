<script>
  import { getContext } from 'svelte'
  import PageHeader from '$lib/page-header.svelte'
  import Submenus from '$lib/submenus.svelte'

  const item = getContext('item')
  const cu = getContext('currentUser')
  const user = cu.getUser()

  function formatDates(item, user) {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Makassar',
      dateStyle: 'full'
    })
    return {
      day_start: formatter.format(new Date(item.jadwal.day_start)),
      day_end: formatter.format(new Date(item.jadwal.day_end))
    }
  }

  const dates_formatted = formatDates(item, user)

  const menus = [
    { 
      path: `/app/jadwal/${item.jadwal.id}/fixed/pegawai`, 
      label: 'Pegawai' 
    },
    { 
      path: `/app/jadwal/${item.jadwal.id}/fixed/edit`, 
      label: 'Edit' 
    }
  ]
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

<Submenus 
  menus={menus}
/>

<slot></slot>