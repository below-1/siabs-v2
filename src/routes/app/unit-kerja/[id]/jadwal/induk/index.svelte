<script>
  import { getContext } from 'svelte';
  import { browser } from '$app/env';
  import Icon from '@iconify/svelte';
  import { client_fetch_json } from '$lib/http';
  import PageHeader from '$lib/page-header.svelte';
  import Loader from '$lib/loader.svelte';
  import FButton from '$lib/fbutton.svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import CreateDialog from './_create.svelte';
  import ViewToggle from './_view-toggle.svelte';
  import JadwalList from './_jadwal-list.svelte';
  import PegawaiList from './_pegawai-list.svelte';
  import ModalConfirmation from '$lib/modal-confirmation.svelte';
  import day from '$lib/day';

  const unitKerja = getContext('unitKerja');
  const d = day();
  export let aggregation = [];
  export let pegawaiList = [];

  let activeTab = 'jadwal';
  let items = [];
  let loading = false;
  let year = d.year();
  let month = d.month();
  let showCreateDialog = false;
  let showDeleteDialog = false;
  let loadingDelete = false;
  const titleDeleteDialog = 'Konfirmasi Hapus Jadwal';
  const messageDeleteDialog = buildDeleteMessage(year, month);
  $: dateInterval = getDateInterval(year, month);
  $: nikList = pegawaiList.map(pegawai => {
    return pegawai.nik;
  });
  $: loadAggregation(dateInterval);

  function getDateInterval(year, month) {
    const start = new Date(year, month, 1);
    const end = day(start).endOf('month').toDate();
    return {
      start: start.toISOString(),
      end: end.toISOString()
    }
  }

  function buildDeleteMessage(year, month) {
    const timestring = day(new Date(year, month, 1)).format('MMMM YYYY');
    const message = `Anda akan menghapus semua jadwal pada bulan ${timestring}`;
    return message;
  }

  async function loadAggregation(dateInterval) {
    if (!browser) {
      return;
    }
    loading = true;
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/unit-kerja/${unitKerja.id}/jadwal/induk`,
        params: dateInterval
      });
      console.log(response);
      console.log('response');
      aggregation = response.aggregation;
      pegawaiList = response.pegawaiList;

    } catch (err) {
      console.log(err);
      alert('gagal mengambil data');
    } finally {
      loading = false;
    }
  }

  function reload() {
    loadAggregation(dateInterval);
  }

  async function onConfirmDelete() {
    loadingDelete = true;
    try {
      await client_fetch_json({
        method: 'GET',
        path: `/app/absen/remove-for-uk`,
        params: {
          ...dateInterval,
          id: unitKerja.id
        }
      });
    } catch (err) {
      console.log(err);
      alert('gagal menghapus jadwal');
    } finally {
      loadingDelete = true;
      reload();
    }
  }

  async function downloadCsv() {
    if (!browser) {
      return;
    }
    let items = [];
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/unit-kerja/${unitKerja.id}/jadwal/induk/report`,
        params: dateInterval
      });
      items = response.items;
      console.log(items);
      console.log('download items');
    } catch (err) {
      console.log(err);
      return;
    }

    function formatStatus(s) {
      if (s == 'in-time') {
        return 'Tepat Waktu';
      } else if (s == 'late') {
        return 'Terlambat';
      } else if (s == 'alpa') {
        return 'Alpa';
      } else {
        return '-';
      }
    }

    const rows = items.map(item => {
      const row = [
        item.nama,
        
        day(item.alert_masuk).format('DD-MM-YYYY'),
        day(item.alert_masuk).format('HH:mm'),
        item.absen_masuk 
          ? day(item.absen_masuk).format('HH:mm')
          : 'Belum Absen',
        formatStatus(item.status_masuk),

        day(item.alert_keluar).format('DD-MM-YYYY'),
        day(item.alert_keluar).format('HH:mm'),
        item.absen_keluar
          ? day(item.absen_keluar).format('HH:mm')
          : 'Belum Absen',
        formatStatus(item.status_keluar)
      ];
      const rowString = row.join(',');
      return rowString;
    });
    const headers = [
      'nama',

      'tanggal jadwal masuk',
      'waktu jadwal masuk',
      'waktu absen masuk',
      'keterangan masuk',

      'tanggal jadwal keluar',
      'waktu jadwal keluar',
      'waktu absen keluar',
      'keterangan keluar',
    ].join(',');

    const fileContent = headers + '\n' + rows.join('\n');
    const csvBlob = new Blob([fileContent], {
      type: 'text/csv'
    });
    const url = URL.createObjectURL(csvBlob, );
    window.open(url);
  }

</script>

<style>
  td {
    vertical-align: middle;
  }
</style>

<section class="section">
  <div class="container">
    <h1 class="title">Data Jadwal</h1>
    <div class="columns">
      <div class="column is-7 is-flex is-align-items-center is-flex-wrap-wrap" 
        style="row-gap:4px; column-gap: 4px;">
        <ViewToggle
          bind:active={activeTab}
        />
        <MonthYearSelect 
          bind:year={year}
          bind:month={month}
        />
      </div>
      <div class="column is-5 has-text-right">
        <FButton 
          outline 
          danger
          on:click={() => {
            showDeleteDialog = true;
          }}
        >
          Hapus Jadwal  
        </FButton>
        <FButton on:click={() => {
          showCreateDialog = true;
        }} outline>Tambah Jadwal</FButton>
        <button class="button outline" on:click={downloadCsv}>
          <span>Download CSV</span>
          <Icon icon="carbon:document-download" class="is-small icon" />
        </button>
      </div>
    </div>

    {#if loading}
      <Loader />
    {:else}
      {#if activeTab == 'jadwal'}
        <JadwalList
          items={aggregation}
        />
      {:else if activeTab == 'pegawai'}
        <PegawaiList
          items={pegawaiList}
        />
      {/if}
    {/if}
  </div>
</section>

<CreateDialog 
  bind:show={showCreateDialog} 
  {year}
  {month}
  excludeNIK={nikList}
  on:created={reload}
/>

<ModalConfirmation
  bind:show={showDeleteDialog}
  title={titleDeleteDialog}
  message={messageDeleteDialog}
  onYes={onConfirmDelete}
/>
