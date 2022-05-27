<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { client_fetch_json } from '$lib/http';

  export let pegawai;
  let touchResponseCode = null;
  let geoErrorMessage = null;
  let touchAbsenErrorMessage = null;
  let position = null;

  function getLocation() {
    if (!browser) {
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    } else {
      alert('gagal mengambil lokasi');
    }
  }

  function onGeoSuccess(geoPos) {
    position = geoPos;
    touchAbsen();
  }

  function onGeoError(error) {
    if (error.code == 1) {
      geoErrorMessage = 'Silahkan aktifkan fiture lokasi';
    }
    console.log(error);
  }

  async function touchAbsen() {
    const payload = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      time: new Date()
    }
    try {
      const response = await client_fetch_json({
        method: 'POST',
        path: '/app/absen/current',
        payload
      });
      touchResponseCode = response.code;

      setTimeout(() => {
        window.location = `/app/pegawai/${pegawai.nik}/overview`;
      }, 3000);
    } catch (err) {
      touchAbsenErrorMessage = 'Gagal melakukan absensi online';
    }
  }

  onMount(getLocation);
</script>

<div class="bg-gradient-to-r from-blue-800 to-indigo-500 h-full flex-grow flex items-center justify-center">
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
</div>
