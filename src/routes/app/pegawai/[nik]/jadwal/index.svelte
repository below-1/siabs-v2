<script>
  import { getContext } from 'svelte';
  import { browser } from '$app/env';
  import Icon from '@iconify/svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';

  export let items = [];
  export let aggregation = [];

  $: formatted = items.map(it => {
    const alert_masuk = day(it.absen.alert_masuk)
    const alert_keluar = day(it.absen.alert_keluar)

    let title = '';    
    if (alert_keluar.day() == alert_masuk.day()) {
      title = alert_keluar.format('dddd, DD MMMM, YYYY') + ' ' + alert_masuk.format('HH:mm') + ' - ' + alert_keluar.format('HH:mm')
    } else {
      title = alert_masuk.format('dddd, DD-MM-YYYY, HH:mm') + ' - ' + alert_keluar.format('dddd, DD-MM-YYYY, HH:mm')
    }

    let subtitle = [];
    subtitle.push( alert_keluar.diff(alert_masuk, 'hour') + ' jam' );
    subtitle.push( alert_masuk.fromNow() );

    let status_masuk = null;
    if (it.absen.status_masuk) {
      if (it.absen.status_masuk == 'in-time') {
        status_masuk = 'tepat waktu';
      } else if (it.absen.status_masuk == 'late') {
        status_masuk = 'terlambat';
      }
      subtitle.push(status_masuk);
    }

    return {
      ...it,
      format: {
        title,
        subtitle,
        status_masuk
      }
    }
  });

  const pegawai = getContext('pegawai');
  let loading = false;
  const d = day();

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
      path: `/app/pegawai/${pegawai.nik}/jadwal`,
      params: dateInterval
    })
    aggregation = response.aggregation;
  }
  $: loadAggregation(dateInterval);

  async function load_more() {
    loading = true;
    let params = {};
    if (items.length > 0) {
      params.after = items[items.length - 1].absen.alert_masuk;
    }
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/pegawai/${pegawai.nik}/jadwal`,
        params
      })
      items = [
        ...items,
        ...response.items
      ]
    } catch (err) {
      console.log(err);
      alert('gagal mengambil data absen pegawai');
    }
  }
</script>

<div class="container py-6">
  <div 
    class="flex flex-wrap justify-center md:justify-between items-center gap-x-4 gap-y-2 outer-padding mb-6 sticky bg-white py-2"
    style="top: 3.5rem;"
  >
    <h1 class="text-xl font-bold">Daftar Jadwal</h1>
    <MonthYearSelect 
      bind:year={year}
      bind:month={month}
    />
  </div>

  <div class="flex flex-col md:px-4">
    {#each aggregation as dateGroup}
      <div class="flex border-b hover:bg-gray-200">

        <div class="bg-gray-100 p-2 flex flex-col items-center justify-center w-20">
          <div class="text-lg font-bold">{day(dateGroup.date).format('DD')}</div>
          <div class="text-xs font-bold">{day(dateGroup.date).format('dddd')}</div>
        </div>

        <div class="flex-grow flex flex-wrap items-center justify-end gap-x-4 pr-2 md:pr-0">
          {#if dateGroup.total_absen != 0}
            {#each dateGroup.absen as absen}
              <a 
                class="flex"
                href={`/app/absen/${absen.id}/overview`}
              >

                <div class="bg-blue-500 px-2 text-white flex items-center">{absen.tipe}</div>

                <div class="border-r border-t border-b border-blue-500 p-1 font-bold text-gray-700">
                  {day(absen.alert_masuk).format('HH:mm')} - {day(absen.alert_keluar).format('HH:mm')}
                </div>
              </a>
            {/each}
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
