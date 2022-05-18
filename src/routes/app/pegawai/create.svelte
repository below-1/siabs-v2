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

  const cu = getContext('currentUser');
  const user = cu.getUser();

  let nama = 'Jordan Meta';
  let nip = '9329392893';
  let nik = '9092999911';
  let jenis_kelamin = 'Laki - Laki';
  let tanggal_lahir = '1997-01-20';
  let isAdminUnitKerja = null;
  let username = '';
  let password = '';
  let unitKerjaId = null;

  $: payload = ({
    nama,
    nik,
    nip,
    jenis_kelamin,
    tanggal_lahir,
    username,
    password
  });

  $: verr = useValidation({
    nama: [
      required('nama harus diisi'), 
      min_length('panjang nama minimal 6 karakter') 
    ],
    nik: [
      min_length(6, 'panjang NIK minimal 6 karakter') 
    ],
    nip: [
      min_length(6, 'panjang NIP minimal 6 karakter') 
    ],
    username: [
      required('username harus diisi'),
      min_length(6, 'panjang NIP minimal 6 karakter')
    ],
    password: [
      required('username harus diisi'),
      min_length(6, 'panjang NIP minimal 6 karakter')
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
  <h1 class="font-black text-3xl">Tambah Pegawai</h1>
</PageHeader>

<section>
  <div class="container px-4 py-12">
    <div class="w-full md:w-1/2">
      <form class="flex flex-col gap-y-4" method="post" enctype="multipart/form-data" on:submit{on_submit}>
        <Field label="Nama Pegawai">
          <Finput name="nama" bind:value={nama} error={verr.fields.nama} />
        </Field>
        <Field label="NIK">
          <Finput name="nik" bind:value={nik} error={verr.fields.nik} />
        </Field>
        <Field label="NIP">
          <Finput name="nip" bind:value={nip} error={verr.fields.nip} />
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
        <Field label="Username">
          <Finput name="username" bind:value={username} error={verr.fields.username} />
        </Field>
        <Field label="Password">
          <Finput name="password" bind:value={password} error={verr.fields.password} />
        </Field>
        <Field label="Foto">
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