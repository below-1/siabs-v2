<script>
  import { getContext } from 'svelte'
  import day from '$lib/day'
  import AbsenCell from './_absen-cell.svelte'
  import AddParticipantContext from './_add-participant-context.svelte'

  const item = getContext('item')
  export let days = []
  export let shifts = []
</script>

<div class="container md:px-4 py-6">

  <table class="w-full">
    <thead>
      <tr class="border-b text-sm">
        <th class="text-left md:px-1 px-4 py-2">Hari Tanggal</th>
        {#each shifts as shift}
          <th class="text-left px-1 py-2">
            {shift.waktu_masuk.substr(0, 5)}
            -
            {shift.waktu_keluar.substr(0, 5)}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each days as d}
        <tr class="border-b hover:bg-gray-100">
          <td class="py-2 px-4 md:px-1 text-sm">{day(d.day).format('dddd, DD MMMM, YYYY')}</td>
          <td class="py-2 px-4 md:px-1 text-sm">12 Pegawai</td>
        </tr>
      {/each}
    </tbody>
  </table>

</div>

<!-- <div class="container px-4 py-6">
  <h1 class="text-2xl font-bold text-gray-600 mb-8">Absen Pegawai</h1>

  <div class="flex flex-col gap-y-4">

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
 -->