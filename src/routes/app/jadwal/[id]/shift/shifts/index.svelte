<script>
  import { getContext } from 'svelte'
  import FButton from '$lib/fbutton.svelte'
  import Empty from './_empty.svelte'

  const item = getContext('item')
  export let shifts = []
</script>

<div class="container px-4 py-12">
  {#if shifts.length == 0}
    <Empty />
  {:else}
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold mb-6">Daftar Shift</h1>
      <FButton 
        primary 
        path={`/app/jadwal/${item.jadwal.id}/shift/shifts/create`}
      >Tambah Shift</FButton>
    </div>
    <div class="flex flex-col">
      {#each shifts as shift}
        <a 
          href={`/app/jadwal/${item.jadwal.id}/shift/shifts/${shift.id}`}
          class="flex items-center gap-x-2 py-4 border-b"
        >
          <div class="flex-grow">
            <p 
              class="text-xl font-bold text-gray-900"
            >
              {shift.waktu_masuk.substr(0, 5)} - 
              {shift.waktu_keluar.substr(0, 5)}
            </p>
            <p class="font-bold text-sm italic text-gray-600">{shift.id}</p>
          </div>
          <div class="px-4">
            <p class="italic text-xl text-gray-700">{shift.total_absen} Absen</p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>