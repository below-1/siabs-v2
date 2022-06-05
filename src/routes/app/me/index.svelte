<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import day from '$lib/day';
  import { client_fetch_json } from '$lib/http';
  import Icon from '@iconify/svelte';

  export let pegawai;
  let touchResponseCode = null;
  let geoErrorMessage = null;
  let touchAbsenErrorMessage = null;
  let position = null;
  let state = 'idle';
  let time = new Date();

  function getLocation() {
    if (!browser) {
      return;
    }
    state = 'load_location';
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          geoPos => {
            state = 'location_loaded';
            resolve(geoPos);
          }, 
          err => {
            state = 'location_not_found';
            reject(err);
          });
      } else {
        reject(new Error('NAVIGATOR_OFF'));
      }
    });
  }

  function buildWFOorWFHPayload(absen, time) {
    let status_absen = null;
    let payload = {};
    const {
      status_masuk, 
      status_keluar,
      alert_masuk,
      alert_keluar,
      id
    } = absen;
    const dtime = day(time);
    if (!status_masuk) {
      const dalert_masuk = day(alert_masuk);
      const isBefore = dtime.isBefore(dalert_masuk);

      if ( isBefore ) {
        // Make sure timestamp is not 30 minutes earlier
        if (dtime.diff(dalert_masuk, 'minute') > 30) {
          state = 'early-check-in';
          return;
        }
        status_absen = 'in-time';
      } else {
        status_absen = dtime.diff(dalert_masuk, 'minute') > 30 
          ? 'late'
          : 'alpa';
      }
      payload.absen_masuk = dtime.toISOString();
      payload.status_masuk = status_absen;
    } else if (!status_keluar) {
      const dalert_keluar = day(alert_keluar);
      const isBefore = dtime.isBefore(dalert_masuk);
      if (isBefore) {
        state = 'early-check-out';
        throw new Error(state);
      }
      const diff = dtime.diff(dalert_keluar, 'minute')
      if (diff < 30) {
        status_absen = 'in-time';
      } else {
        status_absen = 'late';
      }
      payload.absen_keluar = dtime.toISOString();
      payload.status_keluar = status_absen;
    } else {
      throw new Error('invariant violated: got absen with status_masuk and status_keluar both not null');
    }
    return payload;
  }

  function buildDLPayload(absen, time) {
    let status_absen = null;
    let payload = {};
    const {
      status_masuk, 
      status_keluar,
      alert_masuk,
      alert_keluar,
      id
    } = absen;
    const dtime = day(time);
    const dalert_masuk = day(alert_masuk);
    const dalert_keluar = day(alert_keluar);
    if (!status_masuk) {
      const isBefore = dtime.isBefore(dalert_masuk);
      if (isBefore) {
        state = 'early-check-in';
        throw new Error(state);
      }
      payload.absen_masuk = dtime.toISOString();
      payload.status_masuk = 'in-time';
    } else if (!status_keluar) {
      const isAfter = dtime.isAfter(dalert_keluar);
      if (isAfter) {
        status_absen = 'late';
      }
      payload.absen_keluar = dtime.toISOString();
      payload.status_keluar = 'in-time';
    } else {
      throw new Error('invariant violated: got absen with status_masuk and status_keluar both not null');
    }
    return payload;
  }

  async function loadCurrentAbsen(position) {
    const payload = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      time: time.toISOString()
    }
    state = 'load_absen';
    try {
      const currentAbsenResponse = await client_fetch_json({
        method: 'GET',
        path: '/app/absen/current',
        params: {
          now: (new Date()).toISOString()
        }
      });
      return currentAbsenResponse.items;
    } catch (err) {
      console.log(err);
      touchAbsenErrorMessage = 'Gagal melakukan absensi online';
    }
  }

  async function updateAbsen(id, payload) {
    const url = `/app/absen/${id}/update`;
    try {
      const response = await client_fetch_json({
        path: url,
        method: 'POST',
        payload
      });
      state = 'success-update';
      return response;
    } catch (err) {
      console.log(err);
      state = 'error-update';
    }
  }

  onMount(async () => {
    if (!browser) {
      return;
    }
    const location = await getLocation();
    const absenList = await loadCurrentAbsen(location);
    if (absenList.length == 0) {
      state = 'empty';
      setTimeout(() => {
        window.location = `/app/pegawai/${pegawai.nik}/overview`;
      }, 3000);
      return;
    }
    const absen = absenList[0];
    const { tipe } = absen;
    const payloadBuilder = tipe == 'dl' ? buildDLPayload : buildWFOorWFHPayload;
    let payload = null;

    try {
      payload = payloadBuilder(absen, time);
    } catch (err) {
      console.log(err);
      return;
    }

    await updateAbsen(absen.id, payload);
  });
</script>

<div class="hero is-medium is-light">
  <div class="hero-body">
    <div class="container has-text-centered">
      <Icon 
        icon="eos-icons:loading" 
        class="icon has-text-primary" 
        style="height: 6rem; width: 6rem;" 
      />
      <div class="title">Scanning Absen...</div>
      {#if state == 'load_location'}
        <div class="subtitle">Mohon Aktifkan Fitur Lokasi</div>
      {:else if state == 'location_loaded'}
        <div class="subtitle">Lokasi Berhasil Didapatkan</div>
      {:else if state == 'location_not_found'}
        <div class="subtitle">Terjadi Kesalahan saat Mengambil data lokasi</div>
      {:else if state == 'load_absen'}
        <div class="subtitle">Mengambil Absen anda</div>
      {:else if state == 'empty'}
        <div class="subtitle">Tidak ada absen untuk saat ini</div>
        <div class="heading">Anda akan dialihkan kehalaman utama</div>
      {:else if state == 'early-check-in'}
        <div class="subtitle">Anda terlalu cepat melakukan check in</div>
      {:else if state == 'early-check-out'}
        <div class="subtitle">Anda terlalu cepat melakukan check out</div>
      {:else if state == 'error-update'}
        <div class="subtitle">Gagal merekam absen</div>
      {:else if state == 'success-update'}
        <div class="subtitle">Berhasil merekan absen</div>
      {/if}

    </div>
  </div>
</div>

<!-- <div class="bg-gradient-to-r from-blue-800 to-indigo-500 h-full flex-grow flex items-center justify-center">
  <div class="container text-white">

    {#if geoErrorMessage}
    <div class="flex flex-col items-center justify-center">
      <svg class="animate-spin h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>

      <div class="text-2xl font-bold">
        Sedang mengecek jadwal anda
      </div>
    </div>
    {/if}

    {#if (touchResponseCode == 'EMPTY_URGENT')}
    <div class="flex flex-col items-center justify-center text-center">
      <div class="container outer-padding text-2xl font-bold">
        Anda tidak mempunyai absen untuk saat ini
      </div>
    </div>

    {:else}
    <div class="text-2xl font-bold">
      Mohon Aktifkan Lokasi  
    </div>
    {/if}

  </div>
</div> -->
