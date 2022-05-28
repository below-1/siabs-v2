<script>
  import { getContext, onMount } from 'svelte';
  import { browser } from '$app/env';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';

  let nextCheckOut = null;
  let loading = false;
  const pegawai = getContext('pegawai');

  async function getNextCheckOut() {
    if (!browser) {
      return;
    }
    loading = true;
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/pegawai/${pegawai.nik}/overview/next-check-out`
      });
      if (response.code == 'EMPTY_CHECK_OUT') {
        nextCheckOut = null;
      } else if (response.code == 'SUCCESS') {
        nextCheckOut = response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      loading = false;
    }
  }

  function onClick() {
    if (nextCheckOut) {
      window.location = `/app/absen/${nextCheckOut.id}/overview`
    }
  }

  onMount(getNextCheckOut);
</script>

<button 
  class="bg-purple-500 py-6"
  class:animate-pulse={loading}
  on:click={onClick}
>
  <div class="container px-4 text-white">
    <div class="text-sm text-left">Jadwal Keluar Selanjutnya</div>

    {#if loading}
    <div class="flex flex-wrap items-center justify-between gap-y-2">
      <div class="text-xl font-black">
        Loading...
      </div>
    </div>

    {:else if nextCheckOut}
    <div class="flex flex-wrap items-center justify-between gap-y-2">
      <div class="text-xl font-black">
        {day(nextCheckOut.alert_keluar).format('dddd, DD MMMM, YYYY [Pukul] HH:mm')}
      </div>
      <div class="text-3xl font-bold">
        14:24:00
      </div>
    </div>

    {:else}
    <div class="flex flex-wrap items-center justify-between gap-y-2">
      <div class="text-xl font-black">
        Tidak Ada Jadwal
      </div>
    </div>

    {/if}

  </div>
</button>
