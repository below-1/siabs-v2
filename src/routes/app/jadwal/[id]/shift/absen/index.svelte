<script>
  import { getContext } from 'svelte'
  import day from '$lib/day'
  import AbsenCell from './_absen-cell.svelte'
  import AddParticipantContext from './_add-participant-context.svelte'

  const item = getContext('item')
  export let days = []
  export let shifts = []

  let transformed = [];

  function transform(days) {
    let hash_table = new Map();
    shifts.forEach(shift => {
      hash_table.set(shift.id, []);
    });

    const day = new Set();
    let result = [];
    let last_d = null;
    let last_obj = null;
    let counter = 0;
    for (let d of days) {
      if (d.day != last_d) {
        last_d = d.day;
        last_obj = {
          ...d,
          shifts: {}
        };
        counter = 0;
      }
      last_obj.shifts[d.id_shift] = d.total_absen;
      counter += 1;
      if (counter == shifts.length) {
        result.push({ ...last_obj });
        last_obj = null;
        last_d = null;
      }
    }
    return result;
  }

  $: sh_data = transform(days);
</script>

<div class="container md:px-4 py-6">
  <p class="font-bold text-gray-600 mb-6 px-4 md:px-0">Daftar Absen Per Hari</p>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-600 dark:text-gray-400">
      <thead>
        <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th class="px-6 py-3">Tanggal</th>
          <th class="px-6 py-3">Hari</th>
          {#each shifts as shift}
            <th class="px-6 py-3">
              {shift.waktu_masuk.substr(0, 5)}
              -
              {shift.waktu_keluar.substr(0, 5)}
            </th>
          {/each}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each sh_data as d}
          <tr class="border-b hover:bg-gray-100">
            <td class="px-6 py-3">{day(d.day).format('DD-MM-YYYY')}</td>
            <td class="px-6 py-3">{day(d.day).format('dddd')}</td>
            {#each shifts as shift}
              <td class="px-6 py-3">{d.shifts[shift.id]}</td>
            {/each}
            <td class="px-6 py-3">
              <a 
                href={`/app/jadwal/${item.jadwal.id}/shift/absen/date?date=${day(d.day).format('YYYY-MM-DD')}`}
                class="border p-1 rounded bg-gray-100 text-xs font-bold text-gray-600"
              >detail</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

</div>
