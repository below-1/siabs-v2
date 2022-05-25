<script>
  import { getContext } from 'svelte'
  import day from '$lib/day'
  import AbsenCell from './_absen-cell.svelte'
  import AddParticipantContext from './_add-participant-context.svelte'

  const item = getContext('item')
  export let days = []
  export let shifts = []
</script>

<div class="container px-4 py-6">
  <h1 class="text-2xl font-bold text-gray-600 mb-8">Absen Pegawai</h1>

  <div class="flex flex-col gap-y-4">

    <!-- Headers -->
    <div class="flex items-center gap-x-2 sticky" style="top: 4.5rem; z-index: 9;">
      <div class="w-1/5 text-center bg-gray-50 py-2 border">Hari Tanggal</div>
      {#each shifts as shift}
        <div class="flex-grow text-center bg-gray-50 py-2 border">
          {shift.waktu_masuk.substr(0, 5)}
          -
          {shift.waktu_keluar.substr(0, 5)}
        </div>
      {/each}
    </div>

    <!-- Using context to triggering modal from deep child -->
    <AddParticipantContext>

      {#each days as d}
      <div class="flex items-start gap-x-2 hover:bg-gray-100">
        <div class="w-1/5 text-center text-sm py-2">
          {day(d.day).format('dddd, DD MMMM, YYYY')}
        </div>
        {#each shifts as shift}
          <AbsenCell 
            shift={shift} 
            date={d.day}
          />
        {/each}
      </div>
      {/each}

    </AddParticipantContext>

  </div>


</div>
