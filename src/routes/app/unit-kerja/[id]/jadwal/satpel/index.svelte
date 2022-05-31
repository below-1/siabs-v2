<script>
  import { getContext } from 'svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import day from '$lib/day';
  import ViewToggle from './_view-toggle.svelte';
  import PegawaiList from './_pegawai-list.svelte';
  import FButton from '$lib/fbutton.svelte';

  const unitKerja = getContext('unitKerja');
  const d = day();
  export let aggregation = [];
  export let pegawaiList = [];

  let activeTab = 'jadwal';
  let year = d.year();
  let month = d.month();
  let showCreateDialog = false;
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
                  href={`/app/unit-kerja/${unitKerja.id}/jadwal/${day(row.d).format('YYYY-MM-DD')}`}
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
