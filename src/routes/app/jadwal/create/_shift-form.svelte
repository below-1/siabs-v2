<script>
  import { onMount, createEventDispatcher, getContext } from 'svelte'
  import { browser } from '$app/env'
  import { client_fetch_json } from '$lib/http'
  import FField from '$lib/field.svelte'
  import FInput from '$lib/finput.svelte'
  import FDate from '$lib/fdate.svelte'
  import FTime from '$lib/ftime.svelte'
  import FSelect from '$lib/fselect.svelte'
  import WorkStatusSelect from '$lib/work-status-select.svelte'
  import Actions from './_actions.svelte'
  import DaySelection from './_day-selection.svelte'

  const dispatch = createEventDispatcher()
  const payload = getContext('payload')

  $payload = {
    ...$payload,
    tipe: 'shift',
    shift: {
      ...$payload.shift,
      tanggal_awal: '2022-05-27',
      tanggal_akhir: '2022-06-04',
      work_type: 'wfo',
      days: [
        true, true, true, true, true, true, true,
      ]
    }
  }

  let unit_kerja_options = [];

  async function loadUnitKerjas() {
    if (!browser) {
      return;
    }
    const { items: unit_kerja_list } = await client_fetch_json({
      method: 'GET',
      path: '/app/unit-kerja/all',
      params: {
        tipe: 'satpel'
      }
    })
    unit_kerja_options = unit_kerja_list.map(it => ({
      text: it.nama,
      value: it.id
    }))
  }

  async function save_jadwal() {
    try {
      const resp = await client_fetch_json({
        method: 'POST',
        path: '/app/jadwal/create',
        payload: $payload
      })
      const { result } = resp;
      const { id_jadwal } = resp;
      window.location = `/app/jadwal/${id_jadwal}/shift/shifts`;
    } catch (err) {
      console.log(err)
      alert('gagal menambah jadwal')
    }
  }

  onMount(loadUnitKerjas)
</script>

<div class="container mx-auto px-4">
  <div
    class="py-4 flex flex-col gap-y-6 md:w-1/2"
  >

    <FField label="Pilih Unit Kerja">
      <FSelect
        name="id_unit_kerja"
        bind:selected={$payload.shift.id_unit_kerja}
        options={unit_kerja_options}
      />
    </FField>

    <FField label="Pilih Tanggal Awal">
      <FDate
        bind:value={$payload.shift.tanggal_awal}
      />
    </FField>

    <FField label="Pilih Tanggal Akhir">
      <FDate
        bind:value={$payload.shift.tanggal_akhir}
      />
    </FField>

    <FField label="Pilih Tipe Kerja">
      <WorkStatusSelect
        name="work_type"
        bind:selected={$payload.shift.work_type}
      />
    </FField>

    <FField label="Hari Kerja">
      <DaySelection 
        bind:flags={$payload.shift.days}
      />
    </FField>

    <Actions 
      back_disabled={false}
      next_disabled={false}
      on:next={save_jadwal}
    />

  </div>
</div>
