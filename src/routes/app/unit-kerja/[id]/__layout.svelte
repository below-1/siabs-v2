<script context="module">
  import { browser } from '$app/env';
  import { page } from '$app/stores';

  export async function load({ params, session, fetch }) {
    const response = await fetch(`/app/unit-kerja/${params.id}/layout-data`, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
    const data = await response.json()
    return {
      status: 200,
      props: data
    }
  }
</script>

<script>
  import { setContext } from 'svelte'

  import PageHeader from '$lib/page-header.svelte'
  import FButton from '$lib/fbutton.svelte'
  import Submenus from '$lib/submenus.svelte'
  import ModalConfirmation from '$lib/modal-confirmation.svelte'

  export let unitKerja = {};
  setContext('unitKerja', unitKerja);

  let deleteModal = false;
  $: deleteMessage = `Apakah anda menghapus data Unit Kerja #${unitKerja ? unitKerja.nama : ''}`

  function showDeleteModal() {
    deleteModal = true;
    console.log(`deleteModal = ${deleteModal}`)
  }

  async function onDelete() {
    window.location = `/app/unit-kerja/${unitKerja.id}/delete`
  }

  const submenus = [
    { label: 'edit data', path: `/app/unit-kerja/${unitKerja.id}/edit-data` },
    { label: 'jadwal', path: `/app/unit-kerja/${unitKerja.id}/jadwal` }
  ]
</script>

<PageHeader>
  <div class="flex flex-col md:flex-row items-center gap-y-2 gap-x-4">
    <img class="hidden md:block h-20 rounded" src={unitKerja.avatar} />
    <div class="flex-grow">
      <h1 class="font-black text-3xl">{unitKerja.nama}</h1>
      <h2 class="text-sm">{unitKerja.alamat}</h2>
      <h2 class="text-sm font-bold">kantor {unitKerja.tipe}</h2>
    </div>
    <FButton 
      on:click={showDeleteModal}
      danger
    >
      Hapus Data
    </FButton>
  </div>
</PageHeader>

<Submenus
  menus={submenus}
>
</Submenus>

<slot></slot>

<ModalConfirmation
  bind:show={deleteModal}
  message={deleteMessage}
  title="Konfirmasi Hapus Unit Kerja"
  onYes={onDelete}
/>