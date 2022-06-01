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
<!-- <section class="section"> -->
<!-- </section> -->

<section class="section">
  <div class="container">

    <div class="columns is-vcentered">

      <div class="column is-6">
        <div class="subtitle has-text-weight-bold">Rangkuman Jadwal {formattedMonth}</div>
      </div>

      <div class="column is-6">
        <MonthYearSelect 
          bind:year={year}
          bind:month={month}
        />
      </div>

    </div>
    <div class="columns">
      <div class="column is-4">
        <nav class="panel">
          <p class="panel-heading">Statistik</p>
          {#each pegawaiInfos as pi}
            <div class="panel-block is-size-6 py-3 px-4 is-flex is-justify-content-space-between">
              <div>{pi.label}</div>
              <div>{pi.value}</div>
            </div>
          {/each}
        </nav>
      </div>
      <div class="column">

        <div class="card mb-5">
          <div class="card-header">
            <div class="card-header-title">
              Presentasi Kehadiran
            </div>
          </div>
          <div class="card-content">
            <KehadiranChart />
          </div>
        </div>

        <div class="card mb-5">
          <div class="card-header">
            <div class="card-header-title">
              Ketepatan Waktu
            </div>
          </div>
          <div class="card-content">
            <KetepatanWaktuChart />
          </div>
        </div>
      </div>
    </div>

  </div>
</section>