<script>
  import {getContext } from 'svelte'
  import { page } from '$app/stores'
  import { client_fetch_json } from '$lib/http'
  import { required, min_length, max_length, useValidation } from '$lib/validation'
  import PageHeader from '$lib/page-header.svelte';
  import FButton from '$lib/fbutton.svelte';
  import Field from '$lib/field.svelte';
  import Ffile from '$lib/ffile.svelte';
  import Finput from '$lib/finput.svelte';
  import FSelect from '$lib/fselect.svelte';

  const cu = getContext('currentUser');
  const user = cu.getUser();

  let nama = '';
  let alamat = '';
  let latitude = null;
  let longitude = null;
  let tipe = 'induk';

  $: payload = ({
    nama,
    alamat,
    latitude,
    longitude,
    tipe,
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

<PageHeader>
  <h1 class="title">Tambah Unit Kerja</h1>
</PageHeader>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-half">
        <form
          on:submit={create_unit_kerja}
          method="POST" 
          enctype="multipart/form-data" 
          class="card"
        >
          <div class="card-content">
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
            <Field label="Tipe Unit Kerja">
              <FSelect
                bind:selected={tipe}
                name="tipe"
                options={[
                  { text: 'Kantor Induk', value: 'induk' },
                  { text: 'Kantor Satpel', value: 'satpel' }
                ]}
              />
            </Field>
            <FButton 
              primary={true} 
              disabled={!verr.valid}
              size="lg"
            >
              simpan data
            </FButton>
          </div>
      </form>
      </div>
    </div>
  </div>
</section>