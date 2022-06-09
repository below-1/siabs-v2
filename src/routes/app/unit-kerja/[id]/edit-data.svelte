<script>
  import { getContext } from 'svelte';
  import { required, min_length, max_length, useValidation } from '$lib/validation'
  import PageHeader from '$lib/page-header.svelte';
  import Field from '$lib/field.svelte';
  import FInput from '$lib/finput.svelte';
  import FButton from '$lib/fbutton.svelte';

  const unitKerja = getContext('unitKerja');

  let nama = unitKerja.nama;
  let alamat = unitKerja.alamat;
  let latitude = unitKerja.latitude;
  let longitude = unitKerja.longitude;

  $: payload = {
    nama,
    alamat,
    latitude,
    longitude
  };

  $: verr = useValidation({
    nama: [
      required('nama harus diisi'), 
      min_length('panjang nama minimal 6 karakter') 
    ],
  }, payload);
</script>

<div class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="title is-size-4">Ubah Data {unitKerja.nama}</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-5">
        <form
          method="POST"
          enctype="multipart/form-data"
          class="card"
        >
          <div class="card-content">
            <Field label="Nama">
              <FInput 
                name="nama"
                bind:value={nama}
                error={verr.fields.nama}
              />
            </Field>

            <Field label="Alamat">
              <FInput 
                name="alamat" 
                bind:value={alamat}
                error={verr.fields.alamat}
              />
            </Field>

            <Field label="Latitude">
              <FInput 
                name="latitude" 
                bind:value={latitude}
              />
            </Field>

            <Field label="Longitude">
              <FInput 
                name="longitude" 
                bind:value={longitude}
              />
            </Field>
            <FButton
              primary
            >
              Simpan
            </FButton>
          </div>

        </form>
      </div>
    </div>
  </div>
</div>

