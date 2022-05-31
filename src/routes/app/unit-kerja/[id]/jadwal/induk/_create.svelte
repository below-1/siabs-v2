<script>
  import { 
    onMount, 
    getContext, 
    createEventDispatcher } from 'svelte';
  import day from '$lib/day';
  import Backdrop from '$lib/backdrop.svelte';
  import WorkStatusSelect from '$lib/work-status-select.svelte';
  import FField from '$lib/field.svelte';
  import FTime from '$lib/ftime.svelte';
  import FButton from '$lib/fbutton.svelte';
  import FSelect from '$lib/fselect.svelte';
  import { client_fetch_json } from '$lib/http';

  const unitKerja = getContext('unitKerja');
  export let show = false;
  export let year;
  export let month;
  export let excludeNIK = [];
  let pegawaiOptions = [];
  let excludeDays = [];
  let nik = null;
  let tipe = 'wfo';

  const dispatch = createEventDispatcher();

  $: filteredOptions = pegawaiOptions.filter(option => {
    return !excludeNIK.includes(option.value);
  });

  async function loadPegawai() {
    try {
      const response = await client_fetch_json({
        path: '/app/pegawai',
        method: 'GET'
      });
      pegawaiOptions = response.items.map(item => {
        return {
          text: item.nama,
          value: item.nik
        }
      });
    } catch (err) {
      console.log(err);
      alert('gagal memuat pegawai');
    }
  }

  function generateAbsenList(year, month) {
    let t = day(new Date(year, month, 1));
    const end = t.endOf('month');
    let result = [];
    const basePayload = {
      nik,
      tipe,
      id_unit_kerja: unitKerja.id,
      kode_shift: 1
    }
    while (t.isBefore(end)) {
      let payload = { ...basePayload };
      payload.alert_masuk = t.hour(8).minute(0).toDate();
      payload.alert_keluar = t.hour(8).minute(0).add(8, 'hour');
      result.push(payload);
      t = t.add(1, 'day');
    }
    return result;
  }

  async function addAbsen() {
    const payloadList = generateAbsenList(year, month);
    try {
      await client_fetch_json({
        path: '/app/absen/create/induk',
        method: 'POST',
        payload: payloadList
      });
      dispatch('created');
    } catch (err) {
      console.log(err);
      alert('gagal menambah absen');
    }
  }

  onMount(loadPegawai);
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
      <p class="modal-card-title">Tambah Pegawai</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <FField label="Pegawai">
        <FSelect bind:selected={nik} options={filteredOptions} />
      </FField>

      <FField label="Status">
        <WorkStatusSelect bind:selected={tipe} />
      </FField>

      <FButton primary on:click={addAbsen}>
        Tambah
      </FButton>
    </section>
  </div>
</div>

