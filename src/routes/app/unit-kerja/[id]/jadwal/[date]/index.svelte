<script>
  import day from '$lib/day';

  export let items = [];
  export let date;
</script>

<div class="container py-6 text-gray-700">
  <p class="text-2xl font-bold outer-padding">List Jadwal Hari {day(date).format('dddd, DD MMMM, YYYY')}</p>
</div>

<div class="container flex flex-col pb-12">
  {#each items as item, i}
    <div 
      class="flex flex-wrap hover:bg-gray-200 outer-padding border-b py-3"
    >
      <img
        class="w-12 h-12 rounded"
        src={item.pegawai.avatar}
      />

      <div class="flex flex-grow flex-col justify-center px-3">
        <div class="text-sm font-bold text-lg">{item.pegawai.nama}</div>
        <div class="flex items-center gap-x-4 text-sm">
          <div>NIK: {item.pegawai.nik}</div>
          <div>NIP: {item.pegawai.nip}</div>
        </div>
      </div>

      <div class="flex-grow flex gap-x-4 items-center md:justify-end text-sm ml-16 mt-2 mb-4">
        {#each item.absen as absen}
          <a 
            class="flex"
            href={`/app/absen/${absen.id}/overview`}
          >

            <div class="bg-blue-500 px-2 text-white flex items-center">{absen.tipe}</div>
            <div class="border-r border-t border-b border-blue-500 p-1 font-bold text-gray-700">
              {day(absen.alert_masuk).format('HH:mm')} - {day(absen.alert_keluar).format('HH:mm')}
            </div>
          </a>
        {/each}
      </div>

    </div>
  {/each}
</div>