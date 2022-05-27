<script>
  import { getContext, onMount, createEventDispatcher } from 'svelte';
  import FButton from '$lib/fbutton.svelte';
  import FInput from '$lib/finput.svelte';
  import FField from '$lib/field.svelte';
  import FSelect from '$lib/fselect.svelte';
  import Backdrop from '$lib/backdrop.svelte';
  import WorkStatusSelect from '$lib/work-status-select.svelte';
  import { browser } from '$app/env';
  import { client_fetch_json } from '$lib/http';

  const dispatch = createEventDispatcher();

  const item = getContext('item');

  export let show = [];

  let nik = null;
  let tipe = item.jadwal.work_type;
  let pegawaiOptions = [];

  async function loadPegawai() {
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: `/app/pegawai`
      });
      pegawaiOptions = response.items.map(pegawai => {
        return {
          text: pegawai.nama,
          value: pegawai.nik
        };
      });
    } catch (err) {
      console.log(err);
      alert('gagal mengambil data pegawai');
    }
  }

  let saveLoading = false;
  async function addAbsen() {
    saveLoading = true;

    const shift = item.shifts[0];
    const payload = {
      id_shift: shift.id,
      nik,
      tipe,
    }
    
    try {
      const response = await client_fetch_json({
        method: 'POST',
        path: `/app/jadwal/${item.jadwal.id}/fixed/add-pegawai`,
        payload
      });
      dispatch('created');
    } catch (err) {
      console.log(err);
      alert('gagal menambah absen');
    } finally {
      saveLoading = false;
    }
  }

  onMount(loadPegawai);
</script>

<Backdrop
  bind:show={show}
  cover
>
  <div class="bg-white p-4 rounded border flex flex-col gap-y-4">
    <p class="mb-6">Tambah Pegawai</p>
    <FField label="Pegawai">
      <FSelect
        options={pegawaiOptions}
        bind:selected={nik}
        name="nik"
      />
    </FField>

    <FField label="Status">
      <WorkStatusSelect bind:selected={tipe} />
    </FField>

    <FButton primary on:click={addAbsen}>
      Simpan
    </FButton>
  </div>
</Backdrop>
