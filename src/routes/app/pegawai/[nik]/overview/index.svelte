<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import day from '$lib/day';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import KehadiranChart from './_kehadiran-chart.svelte';
  import KetepatanWaktuChart from './_ketepatan-waktu-chart.svelte';
  import NextCheckIn from './_next-check-in.svelte';
  import NextCheckOut from './_next-check-out.svelte';
  import AggregateBox from '$lib/aggregate-box.svelte';

  export let aggregate = {};

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
        <div class="heading has-text-weight-bold is-size-4">Rangkuman Jadwal {formattedMonth}</div>
      </div>

      <div class="column is-6">
        <MonthYearSelect 
          bind:year={year}
          bind:month={month}
        />
      </div>

    </div>

    <div class="columns is-multiline is-mobile">
      <AggregateBox
        label="Total"
        value={aggregate.total}
        color="primary"
        icon="clarity:host-group-solid"
      />

      <AggregateBox
        label="WFH"
        value={aggregate.wfh}
        color="danger"
        icon="bxs:home-heart"
      />

      <AggregateBox
        label="WFO"
        value={aggregate.wfo}
        color="info"
        icon="emojione-v1:office-building"
      />

      <AggregateBox
        label="DL"
        value={aggregate.dl}
        color="warning"
        icon="fa-solid:mountain"
      />

      <AggregateBox
        label="Pagi"
        value={aggregate.shift_1}
        color="light"
        icon="emojione-v1:sun"
      />

      <AggregateBox
        label="Malam"
        value={aggregate.shift_2}
        color="dark"
        icon="bxs:moon"
      />
    </div>

    <div class="columns">
      <div class="column">

        <div class="card mb-5">
          <div class="card-header">
            <div class="card-header-title">
              Presentasi Kehadiran
            </div>
          </div>
          <KehadiranChart />
        </div>

        <div class="card mb-5">
          <div class="card-header">
            <div class="card-header-title">
              Ketepatan Waktu
            </div>
          </div>
          <KetepatanWaktuChart />
        </div>
      </div>
    </div>

  </div>
</section>