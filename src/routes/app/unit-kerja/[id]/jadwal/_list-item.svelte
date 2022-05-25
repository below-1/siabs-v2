<script>
  import day from '$lib/day';

  export let item = {};

  $: url = item.jadwal.tipe == 'fixed' 
    ? `/app/jadwal/${item.jadwal.id}/fixed/pegawai`
    : `/app/jadwal/${item.jadwal.id}/shift/shifts`;

  $: day_start = day(item.jadwal.day_start).format('dddd, DD MMMM, YYYY')
  $: day_end = day(item.jadwal.day_end).format('dddd, DD MMMM, YYYY')
</script>

<a 
  href={url}
  class="border-b border-gray-200 py-4 flex flex-col"
>
  <div class="text-lg flex items-center gap-x-3 font-bold">
    <span>{day_start}</span>
    <span>-</span>
    <span>{day_end}</span>
  </div>
  <div class="flex items-center flex-wrap gap-x-4 gap-y-2">
    <div class="px-2 py-0.5 bg-gray-200 text-sm font-bold text-gray-600 uppercase">
      {item.jadwal.tipe}
    </div>
    <div class="px-2 py-0.5 bg-gray-200 text-sm font-bold text-gray-600 uppercase">
      {item.jadwal.work_type}
    </div>
    {#each item.shifts as shift}
      {#if shift.id}
        <div class="px-2 py-0.5 bg-gray-200 text-sm font-bold text-gray-600 flex items-center">
          <span>{shift.waktu_masuk.substr(0, 5)} - {shift.waktu_keluar.substr(0, 5)}</span>
        </div>
      {/if}
    {/each}
  </div>
</a>