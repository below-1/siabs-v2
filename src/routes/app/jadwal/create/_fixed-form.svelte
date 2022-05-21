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
    fixed: {
      ...$payload.fixed,
      tanggal_awal: '2022-06-01',
      tanggal_akhir: '2022-06-30',
      waktu_masuk: '12:00',
      waktu_keluar: '16:00',
      work_type: 'wfo',
      days: [
        true, true, true, true, true, false, false,
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
      path: '/app/unit-kerja/all'
    })
    unit_kerja_options = unit_kerja_list.map(it => ({
      text: it.nama,
      value: it.id
    }))
  }

  async function save_jadwal() {
    const resp = await client_fetch_json({
      method: 'POST',
      path: '/app/jadwal/create',
      payload: $payload
    })
    console.log(resp)
  }

  onMount(loadUnitKerjas)
</script>

<div class="container mx-auto px-4">
  <form
    method="post"
    enctype="multipart/form-data"
    class="py-4 flex flex-col gap-y-6 md:w-1/2"
  >
    <FField label="Pilih Unit Kerja">
      <FSelect
        name="id_unit_kerja"
        bind:selected={$payload.fixed.id_unit_kerja}
        options={unit_kerja_options}
      />
    </FField>

    <FField label="Pilih Tanggal Awal">
      <FDate
        bind:value={$payload.fixed.tanggal_awal}
      />
    </FField>

    <FField label="Pilih Tanggal Akhir">
      <FDate
        bind:value={$payload.fixed.tanggal_akhir}
      />
    </FField>

    <FField label="Waktu Masuk">
      <FTime
        bind:value={$payload.fixed.waktu_masuk}
      />
    </FField>

    <FField label="Waktu Keluar">
      <FTime
        bind:value={$payload.fixed.waktu_keluar}
      />
    </FField>

    <FField label="Pilih Tipe Kerja">
      <WorkStatusSelect
        name="work_type"
        bind:selected={$payload.fixed.work_type}
      />
    </FField>

    <FField label="Hari Kerja">
      <DaySelection 
        bind:flags={$payload.fixed.days}
      />
    </FField>
  </form>

  <Actions 
    back_disabled={false}
    next_disabled={false}
    on:next={save_jadwal}
  />
</div>