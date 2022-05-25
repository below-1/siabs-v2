<script>
  import { setContext, getContext } from 'svelte'
  import { browser } from '$app/env'
  import { client_fetch_json } from '$lib/http'
  import day from '$lib/day'
  import WorkStatusSelect from '$lib/work-status-select.svelte'
  import FField from '$lib/field.svelte'
  import FInput from '$lib/finput.svelte'
  import Backdrop from '$lib/backdrop.svelte'
  import FButton from '$lib/fbutton.svelte'

  const item = getContext('item');

  let selected = {};
  let show = false;
  let nik = null;
  let date = null;
  let shift = null;
  let keyword = '';
  let work_type = item.jadwal.work_type;
  let on_success = null;

  function set_hour(d, hstring) {
    const [ shour, smin ] = hstring.split(':')
    return d.hour(parseInt(shour)).minute(parseInt(smin))
  }

  async function add_participant() {
    if (!date) {
      return;
    }
    if (!shift) {
      return;
    }

    let alert_masuk = set_hour(day(date), shift.waktu_masuk)
    let alert_keluar = set_hour(day(date), shift.waktu_keluar)
    if (alert_keluar.isBefore(alert_masuk)) {
      alert_keluar = alert_keluar.add(1, 'day')
    }

    const payload = {
      nik: selected.nik,
      id_shift: shift.id,
      tipe: work_type,
      alert_masuk: alert_masuk.toDate(),
      alert_keluar: alert_keluar.toDate()
    }

    try {
      const response = await client_fetch_json({
        method: 'POST',
        path: `/app/shift/${shift.id}/add-participant`,
        payload
      })
      if (on_success) {
        await on_success();
      }
    } catch (err) {
      console.log(err)
      alert('gagal menambah absen pegawai')
    }
  }

  let free_pegawai = [];
  async function load_free_participants(shift, keyword) {
    if (!shift) {
      return;
    }
    if (!browser) {
      return;
    }
    const response = await client_fetch_json({
      path: `/app/shift/${shift.id}/free-participant`,
      method: 'GET',
      params: {
        keyword
      }
    });
    console.log('response');
    console.log(response);
    free_pegawai = response.items;
  }

  $: load_free_participants(shift, keyword);

  setContext('show_add_modal', function (d, sh, on_succ) {
    on_success = on_succ;
    shift = sh;
    date = new Date(d);
    show = true;
  })
</script>

<Backdrop bind:show={show}>
  <div class="p-4 rounded border shadow-xl bg-white flex flex-col gap-y-4">
    <p class="font-bold text-gray-600 mb-6">Cari Pegawai</p>
    <FField label="Kata Kunci">
      <FInput bind:value={keyword} />
    </FField>
    <div class="flex flex-col">
      {#each free_pegawai as p}
        <button 
          class="border-b border-gray-200 py-1 flex items-center gap-x-4"
          on:click={() => {
            selected = p;
          }}
          class:border={selected.nik == p.nik}
          class:border-purple-600={selected.nik == p.nik}
        >
          <img
            class="w-8 h-8 rounded"
            src={p.avatar}
          />
          <div class="text-left">
            <div class="text-sm font-bold">{p.nama}</div>
            <div class="text-xs">NIP:{p.nip} NIK:{p.nik}</div>
          </div>
        </button>
      {/each}
    </div>
    <FField label="Status">
      <WorkStatusSelect bind:selected={work_type} />
    </FField>

    <FButton
      primary
      on:click={add_participant}
    >
      simpan
    </FButton>
  </div>
</Backdrop>

<slot></slot>
