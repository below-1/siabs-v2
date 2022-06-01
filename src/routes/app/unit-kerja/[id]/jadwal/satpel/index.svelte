<script context="module">
  export async function load({ params, session, fetch }) {
    let data = {};
    try {
      const response = await fetch(`/app/unit-kerja/${params.id}/jadwal/satpel`, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      });
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
    return {
      status: 200,
      props: data
    };
  }
</script>

<script>
  import { getContext } from 'svelte';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import FButton from '$lib/fbutton.svelte';
  import ViewToggle from './_view-toggle.svelte';
  import PegawaiList from './_pegawai-list.svelte';
  import CreateDialog from './_create.svelte';

  export let aggregation = [];
  export let pegawaiList = [];

  const unitKerja = getContext('unitKerja');
  const d = day();

  let activeTab = 'jadwal';
  let year = d.year();
  let month = d.month();
  let showCreateDialog = false;
  let loading = false;
  $: dateInterval = getDateInterval(year, month);

  $: getData(dateInterval);

  function getDateInterval(year, month) {
    const start = new Date(year, month, 1);
    const end = day(start).endOf('month').toDate();
    return {
      start: start.toISOString(),
      end: end.toISOString()
    }
  }

  async function getData(dateInterval) {
    loading = true;
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/unit-kerja/${unitKerja.id}/jadwal/satpel`,
        params: dateInterval
      });
      aggregation = response.aggregation;
      pegawaiList = response.pegawaiList;
    } catch (err) {
      console.log(err);
      // alert('gagal mengambil data');
    } finally {
      loading = true;
    }
  }

  function reload() {
    getData(dateInterval);
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
    </div>

    {#if activeTab == 'jadwal'}
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th></th>
            <th>Tanggal</th>
            <th>08:00 - 16:00</th>
            <th>20:00 - 04:00</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each aggregation as row}
            <tr>
              <td>{day(row.d).format('dddd')}</td>
              <td>{day(row.d).format('YYYY-MM-DD')}</td>
              <td>{row.shift_1}</td>
              <td>{row.shift_2}</td>
              <td>
                <a
                  href={`/app/unit-kerja/${unitKerja.id}/jadwal/satpel/${day(row.d).format('YYYY-MM-DD')}`}
                >detail</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
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
  excludeNIK={[]}
  on:created={reload}
/>
