<script>
  import { getContext, onMount } from 'svelte';
  import { browser } from '$app/env';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';

  let nextCheckIn = null;
  let loading = false;
  const pegawai = getContext('pegawai');

  async function getNextCheckIn() {
    if (!browser) {
      return;
    }
    loading = true;
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/pegawai/${pegawai.nik}/overview/next-check-in`
      });
      if (response.code == 'EMPTY_CHECK_IN') {
        nextCheckIn = null;
      } else if (response.code == 'SUCCESS') {
        nextCheckIn = response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      loading = false;
    }
  }

  function onClick() {
    if (nextCheckIn) {
      window.location = `/app/absen/${nextCheckIn.id}/overview`
    }
  }

  onMount(getNextCheckIn);
</script>

<button 
  class="bg-blue-500 py-6"
  class:animate-pulse={loading}
  on:click={onClick}
>
  <div class="container px-4 text-white">
    <div class="text-sm text-left">Jadwal Masuk Selanjutnya</div>

    {#if loading}
    <div class="flex flex-wrap items-center justify-between gap-y-2">
      <div class="text-xl font-black">
        Loading...
      </div>
    </div>

    {:else if nextCheckIn}
    <div class="flex flex-wrap items-center justify-between gap-y-2">
      <div class="text-xl font-black">
        {day(nextCheckIn.alert_masuk).format('dddd, DD MMMM, YYYY [Pukul] HH:mm')}
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