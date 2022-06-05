<script context="module">
  import { browser } from '$app/env';
  import { page } from '$app/stores';

  export async function load({ params, session, fetch }) {
    const response = await fetch(`/app/pegawai/${params.nik}/layout-data`);
    const data = await response.json();
    return {
      status: 200,
      props: data
    }
  }
</script>

<script>
  import { setContext, getContext, onMount } from 'svelte';
  import PageHeader from '$lib/page-header.svelte';
  import FButton from '$lib/fbutton.svelte';
  import ModalConfirmation from '$lib/modal-confirmation.svelte';
  import Submenus from '$lib/submenus.svelte'

  export let pegawai;
  export let user;
  setContext('pegawai', pegawai)

  const { getUser } = getContext('currentUser');
  const currentUser = getUser();
  $: menus = buildMenus(currentUser);
  let deleteModal = false;
  $: deleteMessage = `Apakah anda menghapus ${pegawai.nama}`

  function showDeleteModal() {
    deleteModal = true;
    console.log(`deleteModal = ${deleteModal}`)
  }

  function onDelete() {
    window.location = `/app/user/remove?username=${pegawai.user.username}&section_redirect=pegawai`
  }

  function buildMenus(currentUser) {
    let menus = [
      { 
        label: 'overview', 
        path: `/app/pegawai/${pegawai.nik}/overview`, 
        icon: '<ion-icon name="apps-outline"></ion-icon>' },
      { label: 'jadwal', path: `/app/pegawai/${pegawai.nik}/jadwal` },
      { label: 'edit data', path: `/app/pegawai/${pegawai.nik}/edit-data` },
      { label: 'foto', path: `/app/pegawai/${pegawai.nik}/foto` }
    ];
    if (currentUser.super_user) {
      menus.push({
        label: 'Akun',
        path: `/app/pegawai/${pegawai.nik}/account`
      });
    }
    return menus;
  }
</script>

<PageHeader>
  <div class="columns is-vcentered ">
    <div class="column is-2 has-text-centered">
      <figure class="image is-128x128 mx-auto">
        <img
          class="is-rounded"
          src={pegawai.avatar}
        />
      </figure>
    </div>
    <div class="column is-8">
      <h1 class="title">{pegawai.nama}</h1>
      <h3 class="subtitle mb-2">
        <span>{pegawai.nik}</span>
      </h3>

      <h3 class="subtitle mb-2">
        <span>{pegawai.user.username}</span>
      </h3>
    </div>
    <div class="column is-2">
      {#if currentUser.super_user}
      <FButton 
        on:click={showDeleteModal}
        danger
      >
        Hapus Data
      </FButton>
      {/if}
    </div>
  </div>
</PageHeader>

<div class="container">
  <Submenus
    menus={menus}
  >
  </Submenus>
</div>

<slot>
</slot>

<ModalConfirmation
  bind:show={deleteModal}
  message={deleteMessage}
  title="Konfirmasi Hapus Absen"
  onYes={onDelete}
/>
