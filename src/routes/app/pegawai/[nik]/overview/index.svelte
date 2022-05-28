<script>
  import { onMount } from 'svelte';
  import day from '$lib/day';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import KehadiranChart from './_kehadiran-chart.svelte';
  import KetepatanWaktuChart from './_ketepatan-waktu-chart.svelte';
  import NextCheckIn from './_next-check-in.svelte';
  import NextCheckOut from './_next-check-out.svelte';

  const d = day();
  let year = d.year();
  let month = d.month();
  $: formattedMonth = day(new Date(year, month, 1)).format('MMMM YYYY');
  $: dateInterval = getDateInterval(year, month);
  const pegawaiInfos = [
    { label: 'Total Absen', value: 15 },
    { label: 'Hadir', value: 15 },
    { label: 'Tidak Hadir', value: 15 },
    { label: 'Tepat Waktu', value: 15 },
    { label: 'Terlambat', value: 15 },
    { label: 'Sangat Terlambat', value: 15 },
  ];

  function getDateInterval(year, month) {
    const start = new Date(year, month, 1);
    const end = day(start).endOf('month').toDate();
    return {
      start: start.toISOString(),
      end: end.toISOString()
    }
  }
</script>

<NextCheckIn />
<NextCheckOut />

<div class="container grid grid-cols-12 py-12 md:px-4 md:gap-x-8 gap-y-8 text-gray-700">
  <div class="col-span-12 flex flex-wrap justify-between items-center">
    <div class="text-2xl font-black text-left">Rangkuman Jadwal {formattedMonth}</div>
    <MonthYearSelect 
      bind:year={year}
      bind:month={month}
    />
  </div>
  <div class="md:col-span-4 col-span-12 flex flex-col gap-y-4">
    <div class="text-lg font-bold text-left outer-padding">Statistik</div>
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
    <div class="text-lg font-bold text-center">Presentasi Kehadiran</div>
    <KehadiranChart />
    <div class="text-lg font-bold text-center">Ketepatan Waktu</div>
    <KetepatanWaktuChart />
  </div>

</div>
