<script>
  export let item = {};

  $: url = item.jadwal.tipe == 'fixed' 
    ? `/app/jadwal/${item.jadwal.id}/fixed/pegawai`
    : `/app/jadwal/${item.jadwal.id}/shift/shifts`
</script>

<a 
  href={url}
  class="border-b border-gray-200 py-4 flex flex-col"
>
  <div class="text-lg flex items-center gap-x-3 font-bold">
    <span>{item.format.day_start}</span>
    <span>-</span>
    <span>{item.format.day_end}</span>
  </div>
  <div class="flex items-center flex-wrap gap-x-4 gap-y-2">
    <div class="px-2 py-0.5 bg-gray-200 text-sm font-bold text-gray-600 uppercase">
      {item.jadwal.tipe}
    </div>
    {#if item.unit_kerja}
      <div class="px-2 py-0.5 bg-gray-200 text-sm font-bold text-gray-600">
        unit kerja: { item.unit_kerja.nama }
      </div>
    {/if}
    {#each item.shifts as shift}
      {#if shift.id}
        <div class="px-2 py-0.5 bg-gray-200 text-sm font-bold text-gray-600 flex items-center">
          <span>{shift.waktu_masuk} - {shift.waktu_keluar}</span>
        </div>
      {/if}
    {/each}
  </div>
</a>