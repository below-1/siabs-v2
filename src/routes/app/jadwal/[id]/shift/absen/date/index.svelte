<script>
  import { onMount, getContext } from 'svelte';
  import { client_fetch_json } from '$lib/http';
  import { page } from '$app/stores';
  import FButton from '$lib/fbutton.svelte';
  import AddAbsenDialog from './_add-absen.svelte';
  import day from '$lib/day';

  export let items = [];
  export let date = null;
  $: formatted_date = day(date).format('DD-MM-YYYY');
  const item = getContext('item');

  const shifts = item.shifts;

  let showAddAbsen = false;
  function onAddAbsen() {
    showAddAbsen = true;
  }

  async function loadPegawai() {
    const response = await client_fetch_json({
      path: $page.url.pathname + $page.url.search,
      method: 'GET'
    })
    items = response.items;
  }

  function splitItems(items, shifts) {
    return shifts.map(sh => {
      const id_shift = sh.id;
      return {
        ...sh,
        items: items.filter(it => it.absen.id_shift == id_shift)
      }
    })
  }

  $: shiftAbsenList = splitItems(items, shifts);
</script>

<div class="container text-gray-700 py-6">

  <div class="flex items-center justify-between outer-padding mb-6">
    <p class="font-bold text-xl">
      Absen pada tanggal {formatted_date}
    </p>
    <FButton on:click={onAddAbsen} primary>Tambah Absen</FButton>
  </div>

  <div class="flex">
    {#each shiftAbsenList as shift}
      <div class="px-4 flex flex-col flex-grow gap-y-2">

        <div class="flex items-center gap-x-2 py-2 border-b">
          <div>{shift.waktu_masuk.substr(0, 5)}</div>
          -
          <div>{shift.waktu_keluar.substr(0, 5)}</div>
        </div>

        {#each shift.items as item}
          <a
            href={`/app/absen/${item.absen.id}/overview`} 
            class="border-b border-gray-200 py-3 px-2 flex items-center gap-x-4"
          >
            <img
              class="w-8 h-8 rounded"
              src={item.pegawai.avatar}
            />
            <div>
              <div
                class="font-bold text-base"
              >
                {item.pegawai.nama}
              </div>
              <div class="text-xs">NIP:{item.pegawai.nip} NIK:{item.pegawai.nik}</div>
            </div>
            <div class="flex-grow"></div>
          </a>
        {/each}

      </div>
    {/each}
  </div>
</div>

<AddAbsenDialog
  bind:show={showAddAbsen}
  date={date}
  on:created={loadPegawai}
/>
