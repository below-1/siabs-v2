<script>
  import { getContext, onMount } from 'svelte'
  import { browser } from '$app/env'
  import { client_fetch_json } from '$lib/http'
  import Icon from '@iconify/svelte';
  import FButton from '$lib/fbutton.svelte'
  import FInput from '$lib/finput.svelte'
  import day from '$lib/day'

  const item = getContext('item');

  function format(d) {
    return day(d).format('dddd, DD-MM-YYYY, HH:mm')
  }

  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Makassar',
    dateStyle: 'medium',
    timeStyle: 'short'
  })

  export let absen_data = {};
  let absen_list = [];
  let has_next = true;
  $: absen = absen_list.map(it => {
    const alert_masuk = day(it.alert_masuk)
    const alert_keluar = day(it.alert_keluar)

    let title = '';
    let subtitle = []
    if (alert_keluar.month() == alert_masuk.month()) {
      title = alert_keluar.format('dddd, DD MMMM, YYYY') + ' ' + alert_masuk.format('HH:mm') + ' - ' + alert_keluar.format('HH:mm')
    } else {
      title = alert_masuk.format('dddd, DD-MM-YYYY, HH:mm') + ' - ' + alert_keluar.format('dddd, DD-MM-YYYY, HH:mm')
    }

    subtitle.push( alert_keluar.diff(alert_masuk, 'hour') + ' jam' )
    subtitle.push( alert_masuk.fromNow() )

    return {
      ...it,
      format: {
        title,
        subtitle: subtitle.join(', ')
      }
    }
  })

  async function load_items() {
    const path = `/app/jadwal/${item.jadwal.id}/fixed/detail-pegawai/${absen_data.pegawai.nik}/list-absen`
    let params = {}
    if (absen_list.length) {
      params.after = absen_list[absen_list.length - 1].alert_masuk
    }
    const response = await client_fetch_json({
      path,
      method: 'GET',
      params
    })
    has_next = response.has_next;
    absen_list = [ ...absen_list, ...response.items ]
  }

  onMount(load_items);
</script>

<div class="container px-4">
  <div class="text-xl font-bold py-6 mb-4">Detail Absen Pegawai</div>
  <div class="flex flex-col md:flex-row gap-x-2 mb-6">
    <img class="hidden md:block h-16 rounded" src={absen_data.pegawai.avatar} />
    <div class="col-span-12 md:col-span-6 flex flex-col items-center md:items-start justify-center text-gray-500 md:flex-grow">
      <img class="h-32 md:hidden rounded" src={absen_data.pegawai.avatar} />
      <div class="font-black text-lg md:text-xl text-black">{absen_data.pegawai.nama}</div>
      <div class="text-sm font-semibold">NIP: {absen_data.pegawai.nip}, NIK: {absen_data.pegawai.nik}</div>
      <div class="text-sm flex flex-wrap gap-x-4">
      </div>
    </div>
    <div class="flex justify-center items-center text-lg font-semibold">
      {absen.length} jadwal
    </div>
  </div>
</div>


<div class="container px-4">

  <div class="flex flex-col mb-6">
    {#each absen as ab}
      <a 
        href={`/app/absen/${ab.id}/overview`}
        class="py-5 hover:bg-gray-100 border-b"
      >
        <div class="flex items-center gap-x-4 flex-wrap md:flex-nowrap gap-y-2">
          
          <div class="w-full md:w-6/12">
            <div class="tracking-widest md:text-sm font-bold">{ab.format.title}</div>
            <div class="text-xs italic">{ab.format.subtitle}</div>
          </div>
          
          <div class="w-full md:w-6/12 text-sm justify-start md:justify-end flex gap-x-2">

            <div class="bg-gray-200 px-2 uppercase">
              {ab.tipe}
            </div>

            <div class="flex items-center gap-x-2 bg-gray-200 rounded px-2">
              {#if ab.absen_masuk}
                <span>check in</span>
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
              {:else}
                <span>belum check in</span>
                <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
              {/if}
            </div>

            <div class="flex items-center gap-x-2 bg-gray-200 rounded px-2">
              {#if ab.absen_keluar}
                <span>check out</span>
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
              {:else}
                <span>belum check out</span>
                <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
              {/if}
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <button 
    type="button"
    disabled={!has_next}
    class="border rounded px-4 py-1 bg-gray-100 text-sm disabled:opacity-50 mb-8"
    on:click={load_items}
  >
    muat lebih banyak
  </button>

</div>
