<script>
  import PageHeader from '$lib/page-header.svelte';
  import day from '$lib/day';
  import Icon from '@iconify/svelte';
  import AggregateBox from './_aggregate-box.svelte';
  import AggregateChart from './_aggregate-chart.svelte';
  import KehadiranChart from './_kehadiran-chart.svelte';
  import KetepatanWaktuChart from './_ketepatan-waktu-chart.svelte';

  export let aggregate_1 = {};
  const d = day();
</script>

<style>
  /* .count-level .heading {
    font-size: 1.2rem;
  } */
</style>

<div class="hero is-light">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column">
          <h1 class="title">Dashboard</h1>
        </div>
        <div class="column">
          <div class="title has-text-weight-bold has-text-right">
            {d.format('dddd, DD MMMM, YYYY')}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="heading is-size-4">Jadwal Per {d.format('MMMM YYYY')}</div>
    <div class="columns is-multiline is-mobile">

        <AggregateBox
          label="Total"
          value={aggregate_1.total}
          color="primary"
          icon="clarity:host-group-solid"
        />

        <AggregateBox
          label="WFH"
          value={aggregate_1.wfh}
          color="danger"
          icon="bxs:home-heart"
        />

        <AggregateBox
          label="WFO"
          value={aggregate_1.wfo}
          color="info"
          icon="emojione-v1:office-building"
        />

        <AggregateBox
          label="DL"
          value={aggregate_1.dl}
          color="warning"
          icon="fa-solid:mountain"
        />

        <AggregateBox
          label="Pagi"
          value={aggregate_1.shift_1}
          color="light"
          icon="emojione-v1:sun"
        />

        <AggregateBox
          label="Malam"
          value={aggregate_1.shift_2}
          color="dark"
          icon="bxs:moon"
        />

    </div>

  </div>
</section>

<section class="section">
  <div class="container">
    <div class="heading is-size-4">Grafik {d.format('MMMM YYYY')}</div>

    <div class="card mb-5">
      <div class="card-header">
        <div class="card-header-title">
          Presentasi Kehadiran
        </div>
      </div>
      <div class="card-content">
        <AggregateChart/>
      </div>
    </div>


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
</section>