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

<div class="container py-6">

  <div 
    class="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 outer-padding mb-6 sticky bg-white py-2"
    style="top: 3.5rem;"
  >
    <ViewToggle/>
    <MonthYearSelect 
      bind:year={year}
      bind:month={month}
    />
    <FButton on:click={() => {
      showCreateDialog = true;
    }} outline>Tambah Pegawai</FButton>
  </div>

  <div class="flex flex-col md:px-4 border-t">
    {#each aggregation as dateGroup}
      <a 
        class="flex border-b hover:bg-gray-200"
        href={`/app/unit-kerja/${unitKerja.id}/jadwal/${day(dateGroup.d).format('YYYY-MM-DD')}`}
      >
        <div class="bg-gray-100 p-2 flex flex-col items-center justify-center w-20">
          <div class="text-lg font-bold">{day(dateGroup.d).format('DD')}</div>
          <div class="text-xs font-bold">{day(dateGroup.d).format('dddd')}</div>
        </div>

        <div class="bg-gray-100 p-2 px-4 flex flex-col items-center justify-center border-l">
          <div class="text-gray-600">{day(dateGroup.d).format('DD-MM-YYYY')}</div>
        </div>

        <div class="flex-grow flex flex-wrap items-center justify-end gap-x-4 pr-4 md:pr-0">
          <span class="font-bold">{dateGroup.total_absen} pegawai</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<CreateDialog 
  bind:show={showCreateDialog} 
  {year}
  {month}
  excludeNIK={nikList}
  on:created={reload}
/>

