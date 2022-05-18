<script>
  import { onMount } from 'svelte'
  import KehadiranChart from './_kehadiran-chart.svelte'
  import KetepatanWaktuChart from './_ketepatan-waktu-chart.svelte'

  const pegawaiInfos = [
    { label: 'Jadwal Terkini', value: '6 jam lagi', path: `/app/absen/${13}` },
    { label: 'Total Absen', value: 15 },
    { label: 'Hadir', value: 15 },
    { label: 'Tidak Hadir', value: 15 },
    { label: 'Tepat Waktu', value: 15 },
    { label: 'Terlambat', value: 15 },
    { label: 'Sangat Terlambat', value: 15 },
  ]
</script>

<div class="container grid grid-cols-12 py-6 md:px-4 md:gap-x-8 gap-y-8">
  <div class="md:col-span-4 col-span-12 flex flex-col gap-y-4">
    <div class="text-xl font-black text-left px-4">Jadwal Terkini</div>
    <ul>
      {#each pegawaiInfos as pi}
        <li class="border-b border-gray-200 px-4 md:px-2 py-3 flex items-center justify-between text-sm font-bold text-gray-600 hover:bg-gray-100">
          <div>{pi.label}</div>
          <div>{pi.value}</div>
        </li>
      {/each}
    </ul>
  </div>

  <div class="md:col-span-8 col-span-12 flex flex-col gap-y-2">
    <div class="text-xl font-black text-center">Presentasi Kehadiran</div>
    <KehadiranChart />
    <div class="text-xl font-black text-center">Ketepatan Waktu</div>
    <KetepatanWaktuChart />
  </div>

</div>
