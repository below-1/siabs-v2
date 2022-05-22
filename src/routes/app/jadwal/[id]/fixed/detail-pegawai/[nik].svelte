<script>
  import { getContext } from 'svelte'
  import Icon from '@iconify/svelte';
  import FButton from '$lib/fbutton.svelte'
  import FInput from '$lib/finput.svelte'

  const item = getContext('item');

  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Makassar',
    dateStyle: 'medium',
    timeStyle: 'short'
  })

  export let absen_data = {};

  $: absen = absen_data.absen.map(it => ({
    ...it,
    format: {
      alert_masuk: formatter.format(new Date(it.alert_masuk)),
      alert_keluar: formatter.format(new Date(it.alert_keluar))
    }
  }))
</script>

<div class="container px-4">
  <div class="grid grid-cols-12 py-6 border-b">
    <img class="hidden md:block h-16 rounded" src={absen_data.pegawai.avatar} />
    <div class="col-span-12 md:col-span-6 flex flex-col items-center md:items-start justify-center text-gray-500">
      <img class="h-32 md:hidden rounded" src={absen_data.pegawai.avatar} />
      <div class="font-black text-lg md:text-xl text-black">{absen_data.pegawai.nama}</div>
      <div class="text-sm font-semibold">NIP: {absen_data.pegawai.nip}, NIK: {absen_data.pegawai.nik}</div>
      <div class="text-sm flex flex-wrap gap-x-4">
      </div>
    </div>
    <div class="md:col-span-4 flex justify-end items-center">
      {absen.length} jadwal
    </div>
  </div>
</div>


<div class="container px-4">
  <div class="flex flex-col">
    {#each absen as ab}
      <a 
        href={`/app/absen/${ab.id}/overview`}
        class="border-b py-4"
      >
        <div class="flex items-center gap-x-4">
          <div class="font-bold text-sm">{ab.format.alert_masuk}</div> 
          <span>-</span>
          <div class="font-bold text-sm">{ab.format.alert_keluar}</div>
        </div>
        <div class="flex flex-wrap gap-x-4">

          <div class="flex items-center flex-wrap bg-gray-100 rounded px-2 py-0.5 text-xs font-bold gap-x-2">
            {#if ab.waktu_masuk}
              <div>absen masuk</div>
              <Icon icon="mdi:check-bold" class="w-4 h-4 text-green-500" />
            {:else}
              <div>absen masuk</div>
              <Icon icon="mdi:close" class="w-4 h-4 text-pink-500" />
            {/if}
          </div>

          <div class="flex items-center flex-wrap bg-gray-100 rounded px-2 py-0.5 text-xs font-bold gap-x-2">
            {#if ab.waktu_keluar}
              <div>absen keluar</div>
              <Icon icon="mdi:check-bold" class="w-4 h-4 text-green-500" />
            {:else}
              <div>absen keluar</div>
              <Icon icon="mdi:close" class="w-4 h-4 text-pink-500" />
            {/if}
          </div>

        </div>
      </a>
    {/each}
  </div>
</div>