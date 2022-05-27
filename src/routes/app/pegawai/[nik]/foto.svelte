<script>
  import { getContext } from 'svelte';
  import { 
    required, 
    min_length, 
    max_length, 
    useValidation 
  } from '$lib/validation';
  import FFile from '$lib/ffile.svelte';

  import FButton from '$lib/fbutton.svelte';
  import FField from '$lib/field.svelte';

  const pegawai = getContext('pegawai');
</script>

<div class="container px-4 py-6">
  <form
    method="post"
    enctype="multipart/form-data"
    class="md:w-1/2 flex flex-col items-start gap-y-6"
  >
    <FField label="Pilih Gambar">
      <FFile name="avatar" />
    </FField>

    <FButton primary>Simpan</FButton>
  </form>
</div>
