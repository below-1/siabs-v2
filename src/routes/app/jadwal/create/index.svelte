<script>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import PageHeader from '$lib/page-header.svelte'
  import ChooseType from './_choose-type.svelte'
  import FixedForm from './_fixed-form.svelte'
  import ShiftForm from './_shift-form.svelte'
  import FButton from '$lib/fbutton.svelte'

  let step = writable(0)
  let payload = writable({
    tipe: null,
    shift: {
      id_unit_kerja: null,
      tanggal_awal: null,
      tanggal_akhir: null,
      work_type: null,
    },
    fixed: {
      id_unit_kerja: null,
      tanggal_awal: null,
      tanggal_akhir: null,
      waktu_masuk: null,
      waktu_keluar: null,
      pegawai: null,
      work_type: null,
    }
  })

  setContext('step', step)
  setContext('payload', payload)

  function calc_page_titl(step) {
    switch (step) {
      case 0: return 'Pilih Tipe Jadwal';
      case 1: return 'Input Hari dan Waktu';
      case 2: return 'Pilih Pegawai';
      default: return '';
    }
  }

  $: page_title = calc_page_titl($step);
  $: {
    console.log($payload);
  }
</script>

<PageHeader>
  <div>
    <h1 class="font-black text-3xl">{page_title}</h1>
    <h2 class="text-gray-700">Tambah Jadwal</h2>
  </div>
</PageHeader>

{#if $step == 0}
  <ChooseType
    bind:tipe={$payload.tipe}
  />
{:else if $step == 1}
  {#if $payload.tipe == 'fixed'}
    <FixedForm />
  {:else if $payload.tipe == 'shift'}
    <ShiftForm />
  {/if}
{/if}
