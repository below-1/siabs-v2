<script>
  import { getContext } from 'svelte'
  import FButton from '$lib/fbutton.svelte'
  import FInput from '$lib/finput.svelte'

  const item = getContext('item')
  let keyword = ''

  export let pegawai_list = []
</script>

<div class="container px-4">
  <div class="flex flex-col md:flex-row items-center justify-center md:justify-between py-4 border-b gap-y-2 mb-4">
    <div class="text-xl font-bold">Daftar Pegawai</div>
    <FButton path={`/app/jadwal/${item.jadwal.id}/fixed/add-pegawai`} primary>Tambah Pegawai</FButton>
  </div>
  <FInput bind:value={keyword} placeholder="Cari Pegawai.." />
  <div class="mb-4"></div>

  {#if pegawai_list.length}
    {#each pegawai_list as p}
      <a 
        href={`/app/pegawai/${p.pegawai.nik}/overview`}
        class="px-4 border-b border-gray-200 py-4 flex items-center gap-x-4">
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
