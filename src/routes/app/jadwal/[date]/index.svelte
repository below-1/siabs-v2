<script>
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import day from '$lib/day';
  import { client_fetch_json } from '$lib/http';
  import PageHeader from '$lib/page-header.svelte';
  import FDate from '$lib/fdate.svelte';
  import ModalConfirmation from '$lib/modal-confirmation.svelte';

  let items = [];
  let date = day($page.params.date).format('YYYY-MM-DD');
  let selectedAbsenId = null;
  let showDeleteDialog = false;
  let loadingDelete = false;
  const titleDeleteDialog = 'Konfirmasi Hapus Absen';
  $: selectedAbsen = items.find(item => {
    return item.id == selectedAbsenId;
  });
  $: messageDeleteDialog = buildDeleteMessage(selectedAbsen);
  $: getData(date);

  function buildDeleteMessage(selectedAbsen) {
    if (!selectedAbsen) {
      return '';
    }
    const tanggal = day(selectedAbsen.absen.alert_masuk).format('DD, MMMM YYYY');
    const namaPegawai = selectedAbsen.pegawai.nama;
    return `Hapus absen ${namaPegawai} pada tanggal ${tanggal}?`;
  }

  function showDeleteDialogFor(id) {
    selectedAbsenId = id;
    showDeleteDialog = true;
  }

  async function getData(date) {
    if (!browser) {
      return;
    }
    const start = day(date).startOf('day').toISOString();
    const end = day(date).endOf('day').toISOString();
    try {
      const response = await client_fetch_json({
        path: `/app/jadwal/on-date`,
        params: {
          start,
          end
        }
      });
      items = response.items;
    } catch (err) {
      console.log(err);
      alert('gagal mengambil data jadwal');
    }
  }

  async function onConfirmDelete() {
    loadingDelete = true;
    try {
      const response = await client_fetch_json({
        path: `/app/absen/${selectedAbsenId}/remove`
      });
    } catch (err) {
      console.log(err);
      alert('gagal menghapus absen');
    } finally {
      loadingDelete = false;
      getData(date);
    }
  }
</script>

<PageHeader>
  <div class="columns">
    <div class="column is-8">
      <h1 class="title">Detail Jadwal</h1>
    </div>
    <div class="column is-4">
      <FDate bind:value={date} />
    </div>
  </div>
</PageHeader>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="table-container">
          <table class="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Pegawai</th>
                <th>Unit Kerja</th>
                <th>Status</th>
                <th>Waktu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {#each items as item}
                <tr>
                  <td>
                    <div style="display: flex; align-items: center;">
                      <figure class="image is-32x32 mr-4">
                        <img src={item.pegawai.avatar} />
                      </figure>
                      <div>
                        <div class="is-size-6 has-text-weight-bold">{item.pegawai.nama}</div>
                        <div class="is-size-7">{item.pegawai.nik}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {#if item.absen.tipe != 'dl'}
                      <div style="display: flex; align-items: center;">
                        <figure class="image is-32x32 mr-4">
                          <img src={item.unit_kerja.avatar} />
                        </figure>
                        <div>
                          <div class="is-size-6 has-text-weight-bold">{item.unit_kerja.nama}</div>
                          <div class="is-size-7">{item.unit_kerja.alamat}</div>
                        </div>
                      </div>
                    {/if}
                  </td>
                  <td>
                    <div class="is-size-7 has-text-weight-bold">
                      {#if item.absen.tipe == 'dl'}
                        Dinas Luar
                      {:else if item.absen.tipe == 'wfo'}
                        Work From Office
                      {:else}
                        Work From Home
                      {/if}
                    </div>
                  </td>
                  <td class="is-size-7 has-text-weight-bold">
                    {#if item.absen.tipe == 'dl'}
                      00:00 - 23:59
                    {:else if item.absen.shift == 1}
                      08:00 - 16:00
                    {:else}
                      20:00 - 04:00
                    {/if}
                  </td>
                  <td>
                    <a href={`/app/absen/${item.absen.id}/overview`} class="button is-small">
                      <Icon icon="bi:three-dots" class="icon has-text-info"></Icon>
                    </a>
                    <button 
                      class="button is-small"
                      on:click={() => {
                        showDeleteDialogFor(item.id);
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
      </div>
    </div>
  </div>
</section>

<ModalConfirmation
  bind:show={showDeleteDialog}
  title={titleDeleteDialog}
  message={messageDeleteDialog}
  onYes={onConfirmDelete}
>
</ModalConfirmation>
