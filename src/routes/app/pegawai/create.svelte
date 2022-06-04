<script>
  import {getContext } from 'svelte'
  import { page } from '$app/stores'
  import { client_fetch_json } from '$lib/http'
  import { required, min_length, max_length, useValidation } from '$lib/validation'
  import PageHeader from '$lib/page-header.svelte'
  import FButton from '$lib/fbutton.svelte'
  import Field from '$lib/field.svelte'
  import Finput from '$lib/finput.svelte'
  import FSelect from '$lib/fselect.svelte'
  import FDate from '$lib/fdate.svelte'
  import Ffile from '$lib/ffile.svelte'
  import FTimezone from '$lib/ftimezone.svelte';

  const cu = getContext('currentUser');
  const user = cu.getUser();

  let nama = '';
  let nip = '';
  let nik = '';
  let jenis_kelamin = 'Laki - Laki';
  let tanggal_lahir = '1997-01-20';
  let isAdminUnitKerja = null;
  let username = '';
  let password = '';
  let unitKerjaId = null;
  let timezone = '+08:00';

  $: payload = ({
    nama,
    nik,
    jenis_kelamin,
    tanggal_lahir,
    username: nik,
    password: nik,
    timezone
  });

  $: verr = useValidation({
    nama: [
      required('nama harus diisi'), 
      min_length('panjang nama minimal 6 karakter') 
    ],
    nik: [
      min_length(6, 'panjang NIK minimal 6 karakter') 
    ],
    timezone: [
      required('timezone harus diisi')
    ],
  }, payload);

  function on_submit(e) {
    if (!verr.valid) {
      e.preventDefault();
      return false;
    }
  }
</script>

<PageHeader>
  <h1 class="title">Tambah Pegawai</h1>
</PageHeader>

<section class="section">
  <div class="container px-4 py-12">
    <div class="columns">
      <div class="column is-half">
        <form class="card" method="post" enctype="multipart/form-data" on:submit{on_submit}>
          <div class="card">
            <div class="card-content">
              <Field label="Nama Pegawai">
                <Finput name="nama" bind:value={nama} error={verr.fields.nama} />
              </Field>
              <Field label="NIP/NIK">
                <Finput name="nik" bind:value={nik} error={verr.fields.nik} />
              </Field>
              <Field label="Jenis Kelamin">
                <FSelect 
                  name="jenis_kelamin" 
                  options={[
                    { value: 'Laki - Laki', text: 'Laki - Laki' },
                    { value: 'Perempuan', text: 'Perempuan' }
                  ]}
                  bind:selected={jenis_kelamin}
                />
              </Field>
              <Field label="Tanggal Lahir">
                <FDate name="tanggal_lahir" bind:value={tanggal_lahir} />
              </Field>
              <Field label="Foto">
                <Ffile name="avatar" />
              </Field>
              <Field label="Zona Waktu">
                <FTimezone name="timezone" bind:selected={timezone} />
              </Field>
              <FButton 
                primary={true} 
                disabled={!verr.valid}
                size="lg"
              >
                simpan data
              </FButton>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  </div>
</section>