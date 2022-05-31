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
  import day from '$lib/day';

  const unitKerja = getContext('unitKerja');
  const d = day();
  export let aggregation = [];
  export let nikList = [];
  let items = [];
  let loading = false;
  let year = d.year();
  let month = d.month();
  let showCreateDialog = false;

  function getDateInterval(year, month) {
    const start = new Date(year, month, 1);
    const end = day(start).endOf('month').toDate();
    return {
      start: start.toISOString(),
      end: end.toISOString()
    }
  }
  $: dateInterval = getDateInterval(year, month);

  async function loadAggregation(dateInterval) {
    if (!browser) {
      return;
    }
    const response = await client_fetch_json({
      method: 'GET',
      path: `/app/unit-kerja/${unitKerja.id}/jadwal`,
      params: dateInterval
    })
    aggregation = response.aggregation;
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
        <ViewToggle/>
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
    
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th class="has-text-centered">Hari</th>
          <th>Tanggal</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {#each aggregation as dateGroup}
          <tr on:click={(event) => {
            window.location = `/app/unit-kerja/${unitKerja.id}/jadwal/${day(dateGroup.d).format('YYYY-MM-DD')}`
          }}>
            <td width="10%" style="background: rgb(250, 250, 250);">
              <div class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
                <div class="has-text-weight-bold is-size-5">{day(dateGroup.d).format('DD')}</div>
                <div class="is-size-6">{day(dateGroup.d).format('dddd')}</div>
              </div>
            </td>
            <td>
              {day(dateGroup.d).format('DD-MM-YYYY')}
            </td>
            <td>{dateGroup.total_absen}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<CreateDialog 
  bind:show={showCreateDialog} 
  {year}
  {month}
  excludeNIK={nikList}
  on:created={reload}
/>

