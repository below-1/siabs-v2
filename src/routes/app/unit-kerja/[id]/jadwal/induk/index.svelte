<script>
  import { getContext } from 'svelte';
  import { browser } from '$app/env';
  import PageHeader from '$lib/page-header.svelte';
  import ListItem from '../_list-item.svelte';
  import FButton from '$lib/fbutton.svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import CreateDialog from './_create.svelte';
  import { client_fetch_json } from '$lib/http';
  import ViewToggle from './_view-toggle.svelte';
  import JadwalList from './_jadwal-list.svelte';
  import PegawaiList from './_pegawai-list.svelte';
  import day from '$lib/day';

  const unitKerja = getContext('unitKerja');
  const d = day();
  export let aggregation = [];
  export let pegawaiList = [];

  let activeTab = 'jadwal';
  let items = [];
  let loading = false;
  let year = d.year();
  let month = d.month();
  let showCreateDialog = false;
  $: dateInterval = getDateInterval(year, month);
  $: nikList = pegawaiList.map(pegawai => {
    return pegawai.nik;
  });

  function getDateInterval(year, month) {
    const start = new Date(year, month, 1);
    const end = day(start).endOf('month').toDate();
    return {
      start: start.toISOString(),
      end: end.toISOString()
    }
  }

  async function loadAggregation(dateInterval) {
    if (!browser) {
      return;
    }
    const response = await client_fetch_json({
      method: 'GET',
      path: `/app/unit-kerja/${unitKerja.id}/jadwal/induk`,
      params: dateInterval
    });
    console.log(response);
    console.log('response');
    aggregation = response.aggregation;
    pegawaiList = response.pegawaiList;
  }
  $: loadAggregation(dateInterval);

  function reload() {
    loadAggregation(dateInterval);
  }

</script>

<style>
  td {
    vertical-align: middle;
  }
</style>

<section class="section">
  <div class="container">
    <h1 class="title">Data Jadwal</h1>
    <div class="columns">
      <div class="column is-8 is-flex is-align-items-center is-flex-wrap-wrap" 
        style="row-gap:4px; column-gap: 4px;">
        <ViewToggle
          bind:active={activeTab}
        />
        <MonthYearSelect 
          bind:year={year}
          bind:month={month}
        />
      </div>
      <div class="column is-4 has-text-right">
        <FButton on:click={() => {
          showCreateDialog = true;
        }} outline>Tambah Pegawai</FButton>
      </div>
    </div>
    
    {#if activeTab == 'jadwal'}
      <JadwalList
        items={aggregation}
      />
    {:else if activeTab == 'pegawai'}
      <PegawaiList
        items={pegawaiList}
      />
    {/if}
  </div>
</section>

<CreateDialog 
  bind:show={showCreateDialog} 
  {year}
  {month}
  excludeNIK={nikList}
  on:created={reload}
/>

