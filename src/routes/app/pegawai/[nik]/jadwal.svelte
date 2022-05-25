<script>
  import { getContext } from 'svelte';
  import { browser } from '$app/env';
  import Icon from '@iconify/svelte';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day'

  export let items = [];

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

    return {
      ...it,
      format: {
        title,
        subtitle
      }
    }
  })

  const pegawai = getContext('pegawai');
  let loading = false;

  async function load_more() {
    loading = true;
    let params = {};
    if (items.length > 0) {
      params.after = items[items.length - 1].absen.alert_masuk;
    }
    console.log('params')
    console.log(params)
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

<div class="container py-6 px-4">
  <h1 class="text-2xl font-bold mb-6">Data Absen {pegawai.nama}</h1>

  <div class="flex flex-col gap-y-4">
    {#each formatted as item}
      <div
        class="flex items-center gap-x-4 border-b py-3"
      >
        <div class="text-left flex-grow">
          <p class="font-bold text-sm md:text-base">{item.format.title}</p>
          <div class="text-xs md:text-sm flex flex-wrap items-center gap-x-2">
            <a 
              class="py-0.5 px-2 bg-gray-100 rounded border whitespace-nowrap"
              href={`/app/unit-kerja/${item.unit_kerja.id}`}
            >
              {item.unit_kerja.nama}
            </a>
            <span>
              {item.format.subtitle}
            </span>
          </div>
        </div>
        <a
          class="px-1 py-1 rounded bg-blue-500 text-white text-sm"
          href={`/app/absen/${item.absen.id}/overview`}
        >
          <Icon icon="mdi:cube-scan" />
        </a>
      </div>
    {/each}
    <button 
      class="p-2 rounded bg-gray-100 border" 
      on:click={load_more}
    >
      muat lebih banyak
    </button>
  </div>
</div>
