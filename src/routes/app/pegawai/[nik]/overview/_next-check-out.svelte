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

<div
  class="hero is-info is-small"
  class:animate-pulse={loading}
  on:click={onClick}
>
  <div class="hero-body">
    <div class="container">
      <div class="has-text-left">Jadwal Keluar Selanjutnya</div>
      {#if loading}
      <div class="title">
        Loading...
      </div>

      {:else if nextCheckOut}
      <div class="title">
        {day(nextCheckOut.alert_keluar).format('dddd, DD MMMM, YYYY [Pukul] HH:mm')}
      </div>

      {:else}
      <div class="title">
        Tidak Ada Jadwal
      </div>
      {/if}
    </div>


  </div>
</div>
