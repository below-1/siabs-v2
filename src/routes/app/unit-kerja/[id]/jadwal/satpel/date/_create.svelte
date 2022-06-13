<script>
  import { 
    onMount, 
    getContext, 
    createEventDispatcher 
  } from 'svelte';
  import { page } from '$app/stores';
  import { invalidate } from '$app/navigation';
  import { 
    required,
    watchError,
    combineErrors
  } from '$lib/validation';
  import day from '$lib/day';
  import Backdrop from '$lib/backdrop.svelte';
  import FField from '$lib/field.svelte';
  import FTime from '$lib/ftime.svelte';
  import FButton from '$lib/fbutton.svelte';
  import FSelect from '$lib/fselect.svelte';
  import KodeShiftSelect from '$lib/kode-shift-select.svelte';
  import WorkStatusSelect from '$lib/work-status-select.svelte';
  import { client_fetch_json } from '$lib/http';

  const unitKerja = getContext('unitKerja');
  const tipeOptions = [
    { text: 'Work From Office', value: 'wfo' },
    { text: 'Work From Home', value: 'wfh' },
  ];

  export let show = false;
  export let excludeNIK = [];
  export let date;

  let pegawaiOptions = [];
  let excludeDays = [];
  let nik = null;
  let tipe = 'wfo';
  let kode_shift = 1;
  $: errorNik = watchError([ required('pegawai tidak boleh kosong') ])(nik);
  $: formInvalid = combineErrors(errorNik);

  const dispatch = createEventDispatcher();

  $: filteredOptions = pegawaiOptions.filter(option => {
    return !excludeNIK.includes(option.value);
  });

  function set_hour(d, hstring) {
    const [ shour, smin ] = hstring.split(':')
    return d.hour(parseInt(shour)).minute(parseInt(smin));
  }

  async function loadPegawai() {
    const url = `/app/unit-kerja/${unitKerja.id}/pegawai`;
    try {
      const response = await client_fetch_json({
        path: url,
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

  async function addAbsen() {
    let t0 = day(date);
    if (kode_shift == 1) {
      t0 = t0.hour(8).minute(0);
    } else {
      t0 = t0.hour(20).minute(0);
    }
    const t1 = t0.add(12, 'hour');
    const payload = {
      kode_shift,
      tipe,
      nik,
      id_unit_kerja: unitKerja.id,
      alert_masuk: t0.toDate(),
      alert_keluar: t1.toDate()
    };
    try {
      await client_fetch_json({
        path: '/app/absen/create/satpel',
        method: 'POST',
        payload: payload
      });
      console.log('success adding')
      invalidate($page.url);
    } catch (err) {
      console.log(err);
      alert('gagal menambah absen');
    } finally {
      show = false;
    }
  }

  onMount(loadPegawai);
</script>

<style lang="scss">
  .AddPegawaiSatpel {
    box-shadow: 0 0 6px 0 #eee;
    background: white;
    padding: 14px;
    margin: 1rem;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .heading {
        margin: 0;
        font-size: 1.2rem;
      }
    }
  }
</style>

<Backdrop bind:show={show}>
  <div class="AddPegawaiSatpel">
    <header>
      <p class="heading">Tambah Pegawai</p>
      <button 
        class="delete" 
        aria-label="close"
        on:click={() => {
          show = false;
        }}
      ></button>
    </header>
    <section>
      <FField label="Pegawai">
        <FSelect 
          bind:selected={nik} 
          options={filteredOptions} 
          error={errorNik}
        />
      </FField>

      <FField label="Status">
        <WorkStatusSelect bind:selected={tipe} />
      </FField>

      <FField label="Shift">
        <KodeShiftSelect
          bind:selected={kode_shift}
        />
      </FField>

      <FButton 
        primary on:click={addAbsen}
        disabled={formInvalid}
      >
        Tambah
      </FButton>
    </section>
  </div>
</Backdrop>

