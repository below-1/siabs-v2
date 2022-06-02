<script>
  import { getContext } from 'svelte';
  import { browser } from '$app/env';
  import Icon from '@iconify/svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';
  import CreateDialog from './_create.svelte';

  export let items = [];
  export let aggregation = [];

  const pegawai = getContext('pegawai');
  let loading = false;
  const d = day();
  let year = d.year();
  let month = d.month();
  let showCreateDialog = false;
  $: dateInterval = getDateInterval(year, month);
  $: loadAggregation(dateInterval);

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
      path: `/app/pegawai/${pegawai.nik}/jadwal`,
      params: dateInterval
    })
    aggregation = response.aggregation;
  }
</script>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="title">Daftar Jadwal</h1>
      </div>
      <div class="column">
        <div class="is-flex is-justify-content-flex-end">
          <MonthYearSelect 
            bind:year={year}
            bind:month={month}
          />
          <button class="button is-info ml-2" on:click={() => {
              showCreateDialog = true;
            }}>
            <Icon icon="mdi:clipboard-plus" class="is-small icon" />
          </button>
        </div>
      </div>
    </div>
    {#each aggregation as dateGroup}
      <article class="media">
        <figure class="media-left">
          <div 
            class="image is-64x64 is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
            style="background: rgb(245, 245, 245);"
          >
            <div class="is-size-5 has-text-weight-bold">{day(dateGroup.date).format('DD')}</div>
            <div class="text-xs font-bold">{day(dateGroup.date).format('dddd')}</div>
          </div>
        </figure>
        <div class="media-content">
          <div class="content" style="display: flex; flex-wrap: wrap; justify-content: flex-end;">
            {#if dateGroup.total_absen != 0}
              {#each dateGroup.absen as absen}
                <a 
                  class="is-flex is-align-items-center"
                  href={`/app/absen/${absen.id}/overview`}
                  style="border: 1px solid rgb(230, 230, 230); border-radius: 2%;"
                >
                  <div class="pr-2 has-background-info px-2 py-1 has-text-white">{absen.tipe}</div>
                  <div class="px-2">
                    {day(absen.alert_masuk).format('HH:mm')} - {day(absen.alert_keluar).format('HH:mm')}
                  </div>
                </a>
              {/each}
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>

<CreateDialog
  bind:show={showCreateDialog}
/>
