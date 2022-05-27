<script>
  import { getContext, createEventDispatcher } from 'svelte';
  import { browser } from '$app/env';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';
  import Backdrop from '$lib/backdrop.svelte';
  import FField from '$lib/field.svelte';
  import FInput from '$lib/finput.svelte';
  import FSelect from '$lib/fselect.svelte';
  import FButton from '$lib/fbutton.svelte';
  import PegawaiSelect from '$lib/pegawai-select.svelte';
  import WorkStatusSelect from '$lib/work-status-select.svelte';

  const dispatch = createEventDispatcher();

  const item = getContext('item');
  export let show = false;
  export let date = null;

  let listPegawai = [];
  let keyword = '';

  let tipe = item.jadwal.work_type;
  let nik = null;
  let id_shift = null;

  const shiftOptions = item.shifts.map(it => {
    return {
      text: it.waktu_masuk.substr(0, 5) + ' - ' + it.waktu_keluar.substr(0, 5),
      value: it.id
    }
  });

  async function load_pegawai(keyword) {
    if (!browser) {
      return;
    }
    const response = await client_fetch_json({
      path: '/app/pegawai',
      params: {
        keyword,
        limit: 5
      },
      method: 'GET'
    })
    listPegawai = response.items;
  }

  $: load_pegawai(keyword);

  let saveLoading = false;

  async function saveAbsen() {
    saveLoading = true;

    const selectedShift = item.shifts.find(it => it.id === id_shift);
    const [ checkInHour, checkInMinute ] = selectedShift.waktu_masuk.substr(0, 5).split(':')
    const [ checkOutHour, checkOutMinute ] = selectedShift.waktu_keluar.substr(0, 5).split(':')
    const alert_masuk = day(date)
      .hour(parseInt(checkInHour))
      .minute(parseInt(checkInMinute))
      .toDate()
    let alert_keluar = day(date)
      .hour(parseInt(checkOutHour))
      .minute(parseInt(checkOutMinute))
    if (alert_keluar.isBefore(alert_masuk)) {
      alert_keluar = alert_keluar
        .add(1, 'day')
        .toDate()
    }
    const payload = {
      id_shift,
      nik,
      alert_masuk,
      alert_keluar,
      tipe
    }
    
    try {
      const response = await client_fetch_json({
        method: 'POST',
        path: '/app/absen/create',
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
</script>

<Backdrop bind:show={show} cover>
  <div class="bg-white shadow-xl p-4 rounded border text-gray-700 flex flex-col gap-y-4" style="z-index: 100;">
    <div class="text-xl font-bold mb-6">Tambah Absen</div>

    <FField label="Pegawai">
      <PegawaiSelect
        bind:selected={nik}
      />
    </FField>

    <FField label="Shift">
      <FSelect
        bind:selected={id_shift}
        options={shiftOptions}
      />
    </FField>

    <FField label="Status">
      <WorkStatusSelect bind:selected={tipe} />
    </FField>

    <FButton 
      primary
      on:click={saveAbsen}
      loading={saveLoading}
    >
      Tambah Pegawai
    </FButton>
  </div>
</Backdrop>
