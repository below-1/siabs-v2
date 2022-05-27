<script>
  import { getContext } from 'svelte';
  import { client_fetch_json } from '$lib/http';
  import FButton from '$lib/fbutton.svelte';
  import FInput from '$lib/finput.svelte';
  import AddPegawaiDialog from './_add-pegawai.svelte';

  const item = getContext('item')
  let keyword = '';

  let addPegawaiDialog = false;
  function showAddPegawaiDialog() {
    addPegawaiDialog = true;
  }

  export let pegawai_list = [];

  async function loadPegawaiList() {
    const response = await client_fetch_json({
      path: `/app/jadwal/${item.jadwal.id}/fixed/pegawai`,
      method: 'GET'
    });
    pegawai_list = response.pegawai_list;
  }
</script>

<div class="container px-4">
  <div class="flex flex-col md:flex-row items-center justify-center md:justify-between py-4 border-b gap-y-2 mb-4">
    <div class="flex items-center gap-x-2">
      <div class="text-xl font-bold">Daftar Pegawai</div>
      <span class="px-1 rounded bg-gray-200 text-sm">{pegawai_list.length}</span>
    </div>
    <FButton 
      on:click={showAddPegawaiDialog}
      primary
    >Tambah Pegawai</FButton>
  </div>
  <FInput bind:value={keyword} placeholder="Cari Pegawai.." />
  <div class="mb-4"></div>

  {#if pegawai_list.length}
    {#each pegawai_list as p}
      <a 
        href={`/app/jadwal/${item.jadwal.id}/fixed/detail-pegawai/${p.pegawai.nik}`}
        class="border-b border-gray-200 py-4 flex items-center gap-x-4">
        <img
          class="w-12 h-12 rounded"
          src={p.pegawai.avatar}
        />
        <div>
          <div class="text-lg font-bold">{p.pegawai.nama}</div>
          <div class="text-sm">NIP:{p.pegawai.nip} NIK:{p.pegawai.nik}</div>
        </div>
        <div class="flex-grow"></div>
      </a>
    {/each}
  {:else}
    <div>
      Belum ada data pegawai
    </div>
  {/if}
</div>


<AddPegawaiDialog
  bind:show={addPegawaiDialog}
  on:created={loadPegawaiList}
/>
