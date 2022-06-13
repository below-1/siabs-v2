<script>
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import FInput from '$lib/finput.svelte';
  import Empty from '$lib/empty.svelte';
  import SearchBox from '$lib/search-box.svelte';
  import Loader from '$lib/loader.svelte';
  import ModalConfirmation from '$lib/modal-confirmation.svelte';
  import debounce from '$lib/debounce';
  import AddPegawai from './_add-pegawai.svelte'

  const unitKerja = getContext('unitKerja');
  export let items = [];
  export let keyword = '';

  let loading = false;
  let selectedNik = null;
  let showDeleteDialog = false;
  let showAddPegawai = false;
  let loadingDelete = false;
  const titleDeleteDialog = 'Konfirmasi Hapus Pegawai Dari Unit Kerja';
  $: selectedPegawai = items.find(item => {
    return item.nik == selectedNik;
  });
  $: messageDeleteDialog = buildDeleteMessage(selectedPegawai);
  $: niks = items.map(item => item.nik);

  function showDeleteDialogFor(nik) {
    selectedNik = nik;
    showDeleteDialog = true;
  }

  function buildDeleteMessage(selectedPegawai) {
    if (!selectedPegawai) {
      return '';
    }
    return `Anda akan menghapus pegawai ${selectedPegawai.nama} dari unit kerja ${unitKerja.nama}`
  }

  async function _reload(keyword) {
    const url = new URL($page.url);
    url.searchParams.set('keyword', keyword)
    goto(url);
  }

  const reload = debounce((keyword) => {
    _reload(keyword);
  }, 600);

  async function onConfirmDelete() {
    loadingDelete = true;
    try {
      const response = await fetch(`/app/pegawai/${selectedNik}/remove-unit-kerja`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    } catch (err) {
      console.log(err);
      alert('gagal mengeluarkan pegawai dari unit kerja');
    } finally {
      loadingDelete = false;
      reload(keyword);
    }
  }
</script>

<div class="section">
  <div class="container">

    <div class="columns">
      <div class="column is-8">
        <h1 class="title is-size-4">Daftar Pegawai</h1>
      </div>
      <div class="column is-3 has-text-right">
        <SearchBox 
          keyword={keyword}
          on:keyup={event => {
            reload(event.target.value);
          }}
        />
      </div>
      <div class="column is-1 has-text-right">
        <button 
          class="addPegawaiButton button is-info"
          style="width: 100%;"
          on:click={() => {
            console.log(niks);
            showAddPegawai = true;
          }}
        >
          <Icon icon="mdi:plus" style="font-size: 2rem;" />
        </button>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        {#if items.length == 0}
          <Empty />
        {:else}
          <div class="table-container">
            <table class="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>Pegawai</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {#each items as item}
                  <tr>
                    <td width="10%">
                      <figure class="image is-32x32 mr-4">
                        <img src={item.avatar} alt="avatar" />
                      </figure>
                    </td>
                    <td>
                      <div>
                        <div class="is-size-6 has-text-weight-bold">{item.nama}</div>
                        <div class="is-size-7">{item.nik}</div>
                      </div>
                    </td>
                    <td width="10%" class="has-text-right">
                      <a href={`/app/pegawai/${item.nik}/overview`} class="button is-small">
                        <Icon icon="bi:three-dots" class="icon has-text-info"></Icon>
                      </a>
                      <button 
                        class="button is-small"
                        on:click={() => {
                          showDeleteDialogFor(item.nik);
                        }}
                      >
                        <Icon icon="fa-solid:trash-alt" class="icon has-text-danger"></Icon>
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    </div>

  </div>
</div>

<ModalConfirmation
  bind:show={showDeleteDialog}
  title={titleDeleteDialog}
  message={messageDeleteDialog}
  onYes={onConfirmDelete}
  loading={loadingDelete}
>
</ModalConfirmation>

<AddPegawai
  bind:show={showAddPegawai}
  on:created={reload}
  excludedNiks={niks}
/>
