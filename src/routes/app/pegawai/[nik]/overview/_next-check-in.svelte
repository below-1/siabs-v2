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

<div
  class="hero is-primary is-small"
  class:animate-pulse={loading}
  on:click={onClick}
>
  <div class="hero-body">
    <div class="container">
      <div class="has-text-left">Jadwal Masuk Selanjutnya</div>
      {#if loading}
      <div class="title">
        Loading...
      </div>

      {:else if nextCheckIn}
      <div class="title">
        {day(nextCheckIn.alert_masuk).format('dddd, DD MMMM, YYYY [Pukul] HH:mm')}
      </div>

      {:else}
      <div class="title">
        Tidak Ada Jadwal
      </div>
      {/if}
    </div>


  </div>
</div>