<script>
  import {getContext } from 'svelte'
  import { page } from '$app/stores'
  import { client_fetch_json } from '$lib/http'
  import { required, min_length, max_length, useValidation } from '$lib/validation'
  import FButton from '$lib/fbutton.svelte'
  import Field from '$lib/field.svelte'
  import Ffile from '$lib/ffile.svelte'
  import Finput from '$lib/finput.svelte'

  const cu = getContext('currentUser');
  const user = cu.getUser();

  let nama = '';
  let alamat = '';
  let latitude = null;
  let longitude = null;

  $: payload = ({
    nama,
    alamat,
    latitude,
    longitude,
  });

  $: verr = useValidation({
    nama: [required('nama harus diisi') ],
    alamat: [required('alamat harus diisi') ]
  }, payload);

  function create_unit_kerja(e) {
    if (!verr.valid) {
      e.preventDefault();
      return false;
    }
  }
</script>

<section class='section border-b border-gray-200'>
  <div class="container py-12 flex flex-col gap-y-4 px-4">
    <h1 class="font-black text-3xl">Tambah Unit Kerja</h1>
  </div>
</section>

<section>
  <div class="container px-4 py-12">
    <div class="w-full md:w-1/2">
      <form
        on:submit={create_unit_kerja}
        method="POST" 
        enctype="multipart/form-data" 
        class="flex flex-col gap-y-4"
      >
        <Field label="Nama Unit kerja" error={verr.fields.nama}>
          <Finput name="nama" bind:value={nama} error={verr.fields.nama} />
        </Field>
        <Field label="Alamat Unit kerja">
          <textarea
            class="rounded px-2 py-1 font-semibold text-gray-700 border"
            rows=5
            name="alamat"
            bind:value={alamat}
          ></textarea>
        </Field>
        <Field label="Latitude">
          <Finput bind:value={latitude} name="latitude" />
        </Field>
        <Field label="Longitude">
          <Finput bind:value={longitude} name="longitude" />
        </Field>
        <Field label="Pilih Gambar">
          <Ffile name="avatar" />
        </Field>
        <FButton 
          primary={true} 
          disabled={!verr.valid}
          size="lg"
        >
          simpan data
        </FButton>
      </form>
    </div>
  </div>
</section>