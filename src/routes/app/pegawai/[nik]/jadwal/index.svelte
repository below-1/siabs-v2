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
  const cu = getContext('currentUser');
  const currentUser = cu.getUser();
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

  async function downloadCsv() {
    if (!browser) {
      return;
    }
    let items = [];
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/pegawai/${pegawai.nik}/jadwal/report`,
        params: dateInterval
      });
      items = response.items;
    } catch (err) {
      console.log(err);
      return;
    }

    function formatStatus(s) {
      if (s == 'in-time') {
        return 'Tepat Waktu';
      } else if (s == 'late') {
        return 'Terlambat';
      } else if (s == 'alpa') {
        return 'Alpa';
      } else {
        return '-';
      }
    }

    const rows = items.map(item => {
      const row = [
        item.tipe.toUpperCase(),
        day(item.alert_masuk).format('DD-MM-YYYY'),
        day(item.alert_masuk).format('HH:mm'),
        item.absen_masuk 
          ? day(item.absen_masuk).format('HH:mm')
          : 'Belum Absen',
        formatStatus(item.status_masuk),

        day(item.alert_keluar).format('DD-MM-YYYY'),
        day(item.alert_keluar).format('HH:mm'),
        item.absen_keluar
          ? day(item.absen_keluar).format('HH:mm')
          : 'Belum Absen',
        formatStatus(item.status_keluar)
      ];
      const rowString = row.join(',');
      return rowString;
    });
    const headers = [
      'status',

      'tanggal jadwal masuk',
      'waktu jadwal masuk',
      'waktu absen masuk',
      'keterangan masuk',

      'tanggal jadwal keluar',
      'waktu jadwal keluar',
      'waktu absen keluar',
      'keterangan keluar',
    ].join(',');

    const fileContent = headers + '\n' + rows.join('\n');
    const csvBlob = new Blob([fileContent], {
      type: 'text/csv'
    });
    const url = URL.createObjectURL(csvBlob, );
    window.open(url);
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
          {#if currentUser.super_user}
          <button class="button is-info ml-2" on:click={() => {
              showCreateDialog = true;
            }}>
            <Icon icon="mdi:clipboard-plus" class="is-small icon" />
          </button>
          {/if}
          <button class="button outline ml-2" on:click={downloadCsv}>
            <Icon icon="carbon:document-download" class="is-small icon" />
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
