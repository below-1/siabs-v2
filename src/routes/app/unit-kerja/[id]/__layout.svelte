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

  function getSubmenus(unitKerja) {
    const jadwalPath = unitKerja.tipe == 'satpel'
      ? `/app/unit-kerja/${unitKerja.id}/jadwal/satpel`
      : `/app/unit-kerja/${unitKerja.id}/jadwal/induk`;
    return [
      { label: 'edit data', path: `/app/unit-kerja/${unitKerja.id}/edit-data` },
      { label: 'jadwal', path: jadwalPath },
      { label: 'foto', path: `/app/unit-kerja/${unitKerja.id}/foto` },
      { label: 'pegawai', path: `/app/unit-kerja/${unitKerja.id}/pegawai` },
    ]
  }

  $: submenus = getSubmenus(unitKerja);
</script>

<PageHeader>
  <div class="columns is-vcentered ">
    <div class="column is-2 has-text-centered">
      <figure class="image is-128x128 mx-auto">
        <img
          class="is-rounded"
          src={unitKerja.avatar}
        />
      </figure>
    </div>
    <div class="column is-8">
      <h1 class="title">{unitKerja.nama}</h1>
      <h3 class="subtitle mb-2">
        <span>{unitKerja.alamat}</span>
      </h3>
      <h3 class="subtitle">Kantor {unitKerja.tipe}</h3>
    </div>
    <div class="column is-2">
      <FButton 
        on:click={showDeleteModal}
        danger
      >
        Hapus Data
      </FButton>
    </div>
  </div>
</PageHeader>

<div class="container">
  <Submenus
    menus={submenus}
  >
  </Submenus>
</div>

<slot></slot>

<ModalConfirmation
  bind:show={deleteModal}
  message={deleteMessage}
  title="Konfirmasi Hapus Unit Kerja"
  onYes={onDelete}
/>