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

  const dispatch = createEventDispatcher();
  const payload = getContext('payload');

  $payload = {
    ...$payload,
    tipe: 'dl',
    dl: {
      tanggal: null,
      waktu_masuk: null,
      waktu_keluar: null,
      work_type: 'dl',
      lat_dl: null,
      lng_dl: null,
    }
  }
</script>

<div class="container mx-auto px-4">
  <div
    class="py-4 flex flex-col gap-y-6 md:w-1/2"
  >
    <FField label="Pilih Tanggal">
      <FDate
        bind:value={$payload.dl.tanggal_awal}
      />
    </FField>

    <FField label="Pilih Waktu">
      <FTime
        bind:value={$payload.dl.waktu}
      />
    </FField>

    <FField label="Latitude">
      <FInput bind:value={$payload.dl.lat_dl} />
    </FField>

    <FField label="Longitude">
      <FInput bind:value={$payload.dl.lng_dl} />
    </FField>

  </div>
</div>

