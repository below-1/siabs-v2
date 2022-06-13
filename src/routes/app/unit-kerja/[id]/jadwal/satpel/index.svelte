<script>
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import FNumber from '$lib/fnumber.svelte';
  import MonthSelect from '$lib/month-select.svelte';
  import FButton from '$lib/fbutton.svelte';
  import Loader from '$lib/loader.svelte';
  import ViewToggle from './_view-toggle.svelte';
  import PegawaiList from './_pegawai-list.svelte';
  import CreateDialog from './_create.svelte';

  export let aggregation = [];
  export let pegawaiList = [];
  export let start;
  export let end;
  const unitKerja = getContext('unitKerja');
  const d = day();
  $: year = day(start).year();
  $: month = day(month).month();
  let activeTab = 'jadwal';
  let showCreateDialog = false;
  let loading = false;

  function getDateInterval(year, month) {
    const start = new Date(year, month, 1);
    const end = day(start).endOf('month').toDate();
    return {
      start: start.toISOString(),
      end: end.toISOString()
    }
  }

  function reload(year, month) {
    const dateInterval = getDateInterval(year, month);
    const url = new URL($page.url);
    url.searchParams.set('start', dateInterval.start);
    url.searchParams.set('end', dateInterval.end);
    goto(url);
  }

  function onClickDetail(date) {
    const start = day(date).startOf('day').toISOString();
    const end = day(date).endOf('day').toISOString();
    let url = `/app/unit-kerja/${unitKerja.id}/jadwal/satpel/date`
    const searchParams = new URLSearchParams();
    searchParams.set('start', start)
    searchParams.set('end', end)
    url += '?' + searchParams
    goto(url)
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
        style="row-gap:4px; column-gap: 4px;"
      >
        <div style="display: flex; column-gap: 4px;">
          <FNumber
            value={year}
            min={2020}
            max={2050}
            on:change={event => {
              const year = parseInt(event.target.value);
              reload(year, month);
            }}
          />
          <MonthSelect
            month={month}
            on:change={(event) => {
              const month = event.detail;
              reload(year, month);
            }}
          />
        </div>
        <ViewToggle
          bind:active={activeTab}
        />
      </div>
    </div>

    {#if loading}
      <Loader />
    {:else}
      {#if activeTab == 'jadwal'}
        <div class="table-container">
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
                    <button
                      class="button is-small is-info"
                      on:click={() => onClickDetail(row.d)}
                    >detail
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else if activeTab == 'pegawai'}
        <PegawaiList
          items={pegawaiList}
        />
      {/if}
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
