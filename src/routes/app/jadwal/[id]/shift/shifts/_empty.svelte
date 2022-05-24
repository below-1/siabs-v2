<script>
  import { getContext } from 'svelte'
  import FButton from '$lib/fbutton.svelte'

  const item = getContext('item')
</script>

<div class="w-full py-24 bg-gray-200 rounded border flex flex-col gap-y-4 items-center justify-center">
  <h1 class="text-gray-600 text-3xl font-black">Belum Ada Shift pada jadwal ini</h1>
  <FButton primary path={`/app/jadwal/${item.jadwal.id}/shift/shifts/create`}>tambah shift</FButton>
</div>