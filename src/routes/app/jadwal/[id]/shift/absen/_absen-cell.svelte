<script>
  import { onMount, getContext } from 'svelte'
  import Icon from '@iconify/svelte';
  import { browser } from '$app/env'
  import { client_fetch_json } from '$lib/http'

  export let shift;
  export let date;
  let participants = [];
  let loading = false;
  const show_add_modal = getContext('show_add_modal')

  async function loadParticipant() {
    if (!browser) {
      return;
    }
    loading = true;
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/shift/${shift.id}/participant`,
        params: {
          date
        }
      })
      console.log(response);
      console.log('response');
      participants = response.items
    } catch (err) {
      console.log(err);
    } finally {
      loading = false;
    }
  }

  async function remove(id) {
    try {
      const response = await client_fetch_json({
        path: `/app/absen/${id}/remove`,
        method: 'GET'
      });
    } catch (err) {
      console.log(err)
      alert('gagal menghapus absen')
    } finally {
      loadParticipant();
    }
  }

  function on_click_add() {
    console.log('shift');
    console.log(shift);
    show_add_modal(date, shift, loadParticipant)
  }

  onMount(loadParticipant)
</script>

<div class="flex-grow flex flex-col gap-y-2">

  {#if loading}
  <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-slate-200 h-10 w-10"></div>
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 bg-slate-200 rounded"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
          </div>
          <div class="h-2 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
  {/if}

  {#if participants.length == 0} 
    <p 
      class="opacity-50 py-2 font-bold text-gray-600 text-center"
    >
      Data masih kosong
    </p>
  {:else}
    {#each participants as p}
      <div
        class="border bg-gray-50 px-2 rounded py-2 flex items-center gap-x-2"
      >
        <img
          class="w-12 h-12 rounded"
          src={p.pegawai.avatar}
        />
        <div class="text-left flex-grow">
          <div class="font-bold">{p.pegawai.nama}</div>
          <div class="text-xs">NIP:{p.pegawai.nip} NIK:{p.pegawai.nik}</div>
        </div>
        <a
          class="px-1 py-1 rounded bg-blue-500 text-white text-sm"
          href={`/app/absen/${p.absen.id}/overview`}
        >
          <Icon icon="mdi:cube-scan" />
        </a>
        <button 
          class="px-1 py-1 rounded bg-red-400 text-white text-sm"
          on:click={() => remove(p.absen.id)}
        >
          <Icon icon="mdi:close" />
        </button>
      </div>
    {/each}
  {/if}

  <button class="py-1 border border-blue-400 text-sm font-semibold text-gray-500" on:click={on_click_add}>
    Tambah Pegawai
  </button>
</div>
