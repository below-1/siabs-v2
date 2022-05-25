<script>
  import { getContext } from 'svelte';
  import { required, min_length, max_length, useValidation } from '$lib/validation'
  import PageHeader from '$lib/page-header.svelte'
  import FButton from '$lib/fbutton.svelte'
  import Field from '$lib/field.svelte'
  import FInput from '$lib/finput.svelte'
  import FSelect from '$lib/fselect.svelte'
  import FDate from '$lib/fdate.svelte'
  import Ffile from '$lib/ffile.svelte'

  const pegawai = getContext('pegawai');

  let nama = pegawai.nama;
  let nip = pegawai.nip;
  let nik = pegawai.nik;
  let jenis_kelamin = pegawai.jenis_kelamin;
  let tanggal_lahir = pegawai.tanggal_lahir;

  $: payload = ({
    nama,
    nik,
    nip,
    jenis_kelamin,
    tanggal_lahir
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
    ]
  }, payload);

</script>

<PageHeader>
  <h1 class="text-2xl font-bold">Ubah Data {pegawai.nama}</h1>
</PageHeader>

<div class="container px-4 py-6">
  <form
    method="POST"
    enctype="multipart/form-data"
    class="md:w-1/2 flex flex-col gap-y-4"
  >
    <Field label="Nama">
      <FInput 
        name="nama"
        bind:value={nama}
        error={verr.fields.nama}
      />
    </Field>

    <Field label="NIK">
      <FInput 
        name="nik"
        bind:value={nik}
        error={verr.fields.nik}
      />
    </Field>

    <Field label="NIP">
      <FInput 
        name="nip"
        bind:value={nip}
      />
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

    <FButton 
      primary={true} 
      disabled={!verr.valid}
      size="lg"
    >
      simpan data
    </FButton>

  </form>
</div>
