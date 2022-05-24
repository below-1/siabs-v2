<script>
  import { getContext } from 'svelte'
  import FField from '$lib/field.svelte'
  import FInput from '$lib/finput.svelte'
  import FTime from '$lib/ftime.svelte'
  import FButton from '$lib/fbutton.svelte'

  const item = getContext('item')
  const jadwal = item.jadwal

  let waktu_masuk = '00:00'
  let waktu_keluar = '00:00'
</script>

<div class="container px-4 py-6">
  <h1 class="text-2xl font-bold mb-6">Tambah Shift</h1>

  <form 
    method="post" 
    enctype="multipart/form-data"
    class="flex flex-col gap-y-4 md:w-1/2"
  >

    <FField label="Check In">
      <FTime name="waktu_masuk" bind:value={waktu_masuk} />
    </FField>

    <FField label="Check Out">
      <FTime name="waktu_keluar" bind:value={waktu_keluar} />
    </FField>

    <FButton primary>Simpan</FButton>
  </form>

</div>
