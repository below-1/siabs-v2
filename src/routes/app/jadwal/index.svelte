<script>
  import { getContext } from 'svelte';
  import Icon from '@iconify/svelte';
  import { browser } from '$app/env';
  import { client_fetch_json } from '$lib/http';
  import PageHeader from '$lib/page-header.svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import FButton from '$lib/fbutton.svelte';
  import day from '$lib/day';
  import ListItem from './_list-item.svelte';

  const cu = getContext('currentUser');
  const d = day();
  const user = cu.getUser();
  export let items = [];
  let year = d.year();
  let month = d.month();
  let loading = false;
  $: dateInterval = getDateInterval(year, month);
  $: getData(dateInterval);
  $: itemsWithTotal = items.map(withTotal);

  function getDateInterval(year, month) {
    const start = new Date(year, month, 1);
    const end = day(start).endOf('month').toDate();
    return {
      start: start.toISOString(),
      end: end.toISOString()
    }
  }

  function withTotal(item) {
    const total = parseInt(item.dl) + parseInt(item.shift_1) + parseInt(item.shift_2);
    return {
      ...item,
      total
    }
  }

  async function getData(dateInterval) {
    if (!browser) {
      return;
    }
    loading = true;
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/jadwal`,
        params: dateInterval
      });
      items = response.items;
    } catch (err) {
      console.log(err);
    } finally {
      loading = true;
    }
  }
</script>

<style>
  table td {
    vertical-align: middle;
  }
</style>

<PageHeader>
  <div class="columns is-vcentered">
    <div class="column">
      <h1 class="title">Daftar Jadwal</h1>
    </div>
    <div class="column is-4 has-text-right-tablet">
      <MonthYearSelect 
        bind:year={year}
        bind:month={month}
      />
    </div>
  </div>  

</PageHeader>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">

        <table class="table is-fullwidth is-bordered is-striped">
          <thead>
            <tr class="is-size-7">
              <th>Hari Tanggal</th>
              <th>08:00 - 16:00</th>
              <th>20:00 - 04:00</th>
              <th>WFO</th>
              <th>WFH</th>
              <th>DL</th>
              <th>Tepat Waktu</th>
              <th>Terlambat</th>
              <th>Alpa</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="is-size-7">
            {#each itemsWithTotal as item}
              <tr>
                <td>{day(item.d).format('dddd, DD MMMM, YYYY')}</td>
                <td>{item.shift_1}</td>
                <td>{item.shift_2}</td>
                <td>{item.wfo}</td>
                <td>{item.wfh}</td>
                <td>{item.dl}</td>
                <td>{item.in_time}</td>
                <td>{item.late}</td>
                <td>{item.alpa}</td>
                <td>{item.total}</td>
                <td class='has-text-centered'>
                  <a 
                    href={`/app/jadwal/${day(item.d).format('YYYY-MM-DD')}`}
                    class="button is-info is-small"
                  >
                    <Icon icon="mdi:eye" class="is-small icon" />
                  </a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
