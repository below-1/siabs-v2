<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import day from '$lib/day';
  import { 
    required, 
    min_length, 
    max_length, 
    watchError,
    combineErrors
  } from '$lib/validation';
  import WorkStatusSelect from '$lib/work-status-select.svelte';
  import FField from '$lib/field.svelte';
  import FDate from '$lib/fdate.svelte';
  import FInput from '$lib/finput.svelte';
  import FSelect from '$lib/fselect.svelte';
  import FButton from '$lib/fbutton.svelte';
  import KodeShiftSelect from '$lib/kode-shift-select.svelte';
  import { client_fetch_json } from '$lib/http';

  export let show = false;
  let nik = $page.params.nik;
  let kode_shift = 1;
  let tanggal = day().format('YYYY-MM-DD');
  let tipe = 'wfo';
  let id_unit_kerja = null;
  let unitKerjaOptions = [];
  let unitKerjaList = [];
  let dl_lat = null;
  let dl_lng = null;
  let loading = false;
  $: selectedUnitKerja = getSelectedUnitKerja(unitKerjaList, id_unit_kerja);

  function unitKerjaValidator(v) {
    if (!v) {
      return 'unit kerja harus dipilih untuk WFO dan WFH';
    }
    return null;
  }

  // Define validation errors as reactive variables
  $: errorUnitKerja = watchError([ unitKerjaValidator ])(id_unit_kerja);
  $: errorTanggal = watchError([ required('Tanggal Harus Diisi') ])(tanggal);
  $: formInvalid = combineErrors(errorTanggal, errorUnitKerja);

  async function getUnitKerja() {
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/unit-kerja`
      });
      unitKerjaList = response.items;
      unitKerjaOptions = response.items.map(unitKerja => {
        return {
          text: unitKerja.nama,
          value: unitKerja.id
        }
      });
    } catch (err) {
      console.log(err);
      alert('gagal memuat data unit kerja');
    }
  }

  function getSelectedUnitKerja(unitKerjaList, id_unit_kerja) {
    if (!id_unit_kerja) {
      return null;
    }
    if (!unitKerjaList.length) {
      return null;
    }
    const result = unitKerjaList.find(unitKerja => {
      return unitKerja.id == id_unit_kerja;
    });
    return result;
  }

  function getPayload() {
    let payload = {};
    payload.tipe = tipe;
    payload.nik = nik;
    if (tipe == 'dl') {
      payload.alert_masuk = day(tanggal).startOf('day').toISOString();
      payload.alert_keluar = day(tanggal).endOf('day').toISOString();
    } else {
      if (selectedUnitKerja.tipe == 'satpel' && kode_shift == 2) {
        payload.alert_masuk = day(tanggal).hour(20).minute(0).toISOString();
        payload.alert_keluar = day(tanggal).add(1, 'day').hour(4).minute(0).toISOString();
      } else {
        payload.alert_masuk = day(tanggal).hour(8).minute(0).toISOString();
        payload.alert_keluar = day(tanggal).hour(16).minute(0).toISOString();
      }
      payload.id_unit_kerja = id_unit_kerja;
      payload.kode_shift = kode_shift;
    }
    // console.log(payload);
    // console.log(day(payload.alert_masuk).toDate());
    // throw new Error('stop');
    return payload;
  }

  async function save() {
    loading = true;
    const payload = getPayload();
    try {
      const response = await client_fetch_json({
        method: 'POST',
        path: '/app/absen/create',
        payload
      });
      const { id } = response;
      window.location = `/app/absen/${id}/overview`;
    } catch (err) {
      console.log(err);
      alert('gagal menambah absen');
    } finally {
      loading = false;
    }
  }

  onMount(getUnitKerja);
</script>

<div 
  class="modal"
  class:is-active={show}
>
  <div 
    class="modal-background"
    on:click|self={() => {
      show = false;
    }} 
  ></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Tambah Absen</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">

      <FField label="Tanggal">
        <FDate bind:value={tanggal} error={errorTanggal} />
      </FField>

      <FField label="Status">
        <WorkStatusSelect bind:selected={tipe} />
      </FField>

      {#if tipe != 'dl'}
        <FField label="Unit Kerja">
          <FSelect
            bind:selected={id_unit_kerja}
            options={unitKerjaOptions}
            error={errorUnitKerja}
          />
        </FField>

        {#if selectedUnitKerja && selectedUnitKerja.tipe == 'satpel'}
        <FField label="Shift">
          <KodeShiftSelect
            bind:selected={kode_shift}
          />
        </FField>
        {/if}
      {/if}


      <FButton 
        primary on:click={save}
        {loading}
        disabled={formInvalid}
      >
        Tambah
      </FButton>

    </section>
  </div>
</div>

