<script>
  import { getContext } from 'svelte'
  import FButton from '$lib/fbutton.svelte'
  import FInput from '$lib/finput.svelte'
  import FField from '$lib/field.svelte'
  import Backdrop from '$lib/backdrop.svelte'
  import WorkStatusSelect from '$lib/work-status-select.svelte'
  import { browser } from '$app/env'
  import { client_fetch_json } from '$lib/http'

  const item = getContext('item')
  let keyword = ''
  let show_form = false
  let work_status = null;
  let options = []
  let selected = null;

  async function search_pegawai(keyword) {
    if (!browser) {
      return;
    }
    const resp = await client_fetch_json({
      method: 'GET',
      path: '/app/pegawai',
      params: {
        keyword,
        limit: 5
      }
    })
    options = resp.items
  }

  function on_click_pegawai(p) {
    show_form = true;
    selected = p;
  }

  $: search_pegawai(keyword)
</script>

<div class="container px-4">
  <div class="flex flex-col md:flex-row items-center justify-center md:justify-between py-4 border-b gap-y-2 mb-4">
    <div class="text-xl font-bold">Tambah Pegawai</div>
  </div>

  <div class="w-full md:w-1/2">
    <FInput bind:value={keyword} placeholder="Cari Pegawai.." />
    <div class="flex flex-col">
      {#each options as p}
        <button
          on:click={() => on_click_pegawai(p)}
          class="px-4 border-b border-gray-200 py-4 flex items-center gap-x-4">
          <img
            class="w-12 h-12 rounded"
            src={p.avatar}
          />
          <div class="text-left">
            <div class="text-lg font-bold">{p.nama}</div>
            <div class="text-sm">NIP:{p.nip} NIK:{p.nik}</div>
          </div>
          <div class="flex-grow"></div>
        </button>
      {/each}
    </div>
  </div>

</div>

<Backdrop 
  bind:show={show_form}
>
  <div 
    class="bg-white p-4 rounded shadow-xl flex flex-col gap-y-4 w-5/6 md:w-1/3"
  >
    <div class="text-xl font-bold">Detail Absen</div>
    <form class="flex flex-col gap-y-4" method="POST" enctype="multipart/form-data">

      <FField label="Pegawai">
        <div
          class="px-4 border-b border-gray-200 py-4 flex items-center gap-x-2"
        >
          <img
            class="w-12 h-12 rounded"
            src={selected.avatar}
          />
          <div class="text-left">
            <div class="text-lg font-bold">{selected.nama}</div>
            <div class="text-sm">NIP:{selected.nip} NIK:{selected.nik}</div>
          </div>
          <div class="flex-grow"></div>
        </div>
      </FField>

      <FField label="Status">
        <WorkStatusSelect
          name="work_status"
          bind:selected={work_status}
        />
      </FField>

      <input 
        hidden 
        name="nik" 
        value={selected ? selected.nik : null}
      />

      <input 
        hidden 
        name="shift" 
        value={item.shifts[0].id}
      />

      <FButton primary>
        Simpan
      </FButton>
    </form>
  </div>
</Backdrop>
