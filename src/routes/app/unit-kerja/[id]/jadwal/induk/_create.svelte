<script>
  import { 
    onMount, 
    getContext, 
    createEventDispatcher } from 'svelte';
  import day from '$lib/day';
  import Backdrop from '$lib/backdrop.svelte';
  import WorkStatusSelect from '$lib/work-status-select.svelte';
  import { 
    required,
    watchError,
    combineErrors
  } from '$lib/validation';
  import FField from '$lib/field.svelte';
  import FTime from '$lib/ftime.svelte';
  import FButton from '$lib/fbutton.svelte';
  import FSelect from '$lib/fselect.svelte';
  import { client_fetch_json } from '$lib/http';

  const unitKerja = getContext('unitKerja');
  export let show = false;
  export let year;
  export let month;
  let workDays = [false, true, true, true, true, true, false];
  let nik = null;
  let tipe = 'wfo';

  const dispatch = createEventDispatcher();

  async function addAbsen() {
    const start = day(new Date(year, month, 1));
    const end = start.endOf('month');
    const payload = {
      id_unit_kerja: unitKerja.id,
      start: start.toDate(),
      end: end.toDate(),
      tipe,
      workDays
    }
    try {
      await client_fetch_json({
        path: '/app/absen/create/induk',
        method: 'POST',
        payload
      });
      dispatch('created');
    } catch (err) {
      console.log(err);
      alert('gagal menambah absen');
    }
  }
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
      <FField label="Status">
        <WorkStatusSelect bind:selected={tipe} />
      </FField>

      <FField label="Hari Kerja">
        <div style="display: flex; flex-direction: column;">
          <label class="checkbox mb-2">
            <input type="checkbox" bind:checked={workDays[1]}>
            Senin
          </label>
          <label class="checkbox mb-2">
            <input type="checkbox" bind:checked={workDays[2]}>
            Selasa
          </label>
          <label class="checkbox mb-2">
            <input type="checkbox" bind:checked={workDays[3]}>
            Rabu
          </label>
          <label class="checkbox mb-2">
            <input type="checkbox" bind:checked={workDays[4]}>
            Kamis 
          </label>
          <label class="checkbox mb-2">
            <input type="checkbox" bind:checked={workDays[5]}>
            Jumat
          </label>
          <label class="checkbox mb-2">
            <input type="checkbox" bind:checked={workDays[6]}>
            Sabtu
          </label>
          <label class="checkbox mb-2">
            <input type="checkbox" bind:checked={workDays[0]}>
            Minggu
          </label>
        </div>
      </FField>

      <FButton 
        primary on:click={addAbsen}
      >
        Tambah
      </FButton>
    </section>
  </div>
</div>

