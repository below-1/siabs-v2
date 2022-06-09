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

  console.log(pegawai);
  console.log('pegawai');

  export let unitKerjaList = [];
  $: unitKerjaOptions = buildUnitKerjaOptions(unitKerjaList);
  let nama = pegawai.nama;
  let nip = pegawai.nip;
  let nik = pegawai.nik;
  let jenis_kelamin = pegawai.jenis_kelamin;
  let tanggal_lahir = pegawai.tanggal_lahir;
  let whatsapp = pegawai.whatsapp;
  let id_unit_kerja = pegawai.id_unit_kerja;
  $: payload = ({
    nama,
    nik,
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
    ]
  }, payload);

  function buildUnitKerjaOptions(unitKerjaList) {
    let result = unitKerjaList.map(unitKerja => {
      return {
        text: unitKerja.nama,
        value: unitKerja.id
      }
    });
    result = [
      { value: null, text: 'Tidak Ada' },
      ...result
    ]
    return result;
  }

</script>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-5">
        <h1 class="title">Ubah Data {pegawai.nama}</h1>
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

            <Field label="NIK/NIP">
              <FInput 
                name="nik"
                bind:value={nik}
                error={verr.fields.nik}
              />
            </Field>

            <Field label="Unit Kerja">
                <FSelect 
                  name="id_unit_kerja" 
                  bind:selected={id_unit_kerja} 
                  options={unitKerjaOptions}
                />
              </Field>

            <Field label="WhatsApp">
              <FInput 
                name="whatsapp"
                bind:value={whatsapp}
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
            >
              simpan data
            </FButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

