<script>
  import { getContext } from 'svelte';
  import { browser } from '$app/env';
  import PageHeader from '$lib/page-header.svelte';
  import ListItem from './_list-item.svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';

  const unitKerja = getContext('unitKerja');
  const d = day();

  export let items = [];
  export let aggregation = [];

  let loading = false;
  let year = d.year();
  let month = d.month();

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

</script>

<div class="container py-6">
  <div class="flex flex-wrap justify-center md:justify-between items-center gap-x-4 outer-padding mb-6">
    <h1 class="text-xl font-bold">Daftar Jadwal</h1>
    <MonthYearSelect 
      bind:year={year}
      bind:month={month}
    />
  </div>

  <div class="flex flex-col md:px-4 border-t">
    {#each aggregation as dateGroup}
      <div class="flex border-b hover:bg-gray-200">

        <div class="bg-gray-100 p-2 flex flex-col items-center justify-center w-20">
          <div class="text-lg font-bold">{day(dateGroup.date).format('DD')}</div>
          <div class="text-xs font-bold">{day(dateGroup.date).format('dddd')}</div>
        </div>

        <div class="bg-gray-100 p-2 px-4 flex flex-col items-center justify-center border-l">
          <div class="text-gray-600">{day(dateGroup.date).format('DD-MM-YYYY')}</div>
        </div>

        <div class="flex-grow flex flex-wrap items-center justify-end gap-x-4 pr-4 md:pr-0">
          <span class="font-bold">{dateGroup.total_absen} pegawai</span>
        </div>
      </div>
    {/each}
  </div>
</div>
