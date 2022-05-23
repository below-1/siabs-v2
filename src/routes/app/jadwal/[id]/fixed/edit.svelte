<script>
  import { getContext } from 'svelte'
  import FButton from '$lib/fbutton.svelte'
  import FField from '$lib/field.svelte'
  import FTime from '$lib/ftime.svelte'
  import FDate from '$lib/fdate.svelte'
  import day from '$lib/day'

  const item = getContext('item')

  let day_start = '2022-01-01'
  let day_end = '2022-01-31'
  let waktu_masuk = '07:00'
  let waktu_keluar = '16:00'
</script>

<div class="container px-4">
  <form
    method="POST"
    enctype="multipart/form-data"
    class="w-full md:w-1/2 flex flex-col gap-y-4 py-12"
  >
    <FField label="Tanggal Awal">
      <FDate name="day_start" bind:value={day_start} />
    </FField>

    <FField label="Tanggal Akhir">
      <FDate name="day_end" bind:value={day_end} />
    </FField>

    <FField label="Check In">
      <FTime name="waktu_masuk" bind:value={waktu_masuk} />
    </FField>

    <FField label="Check Out">
      <FTime name="waktu_keluar" bind:value={waktu_keluar} />
    </FField>

    <FButton primary>Simpan</FButton>
  </form>
</div>


