<script>
  import { onMount } from 'svelte';
  import FSelect from './fselect.svelte';
  import { client_fetch_json } from '$lib/http';

  export let name = '';
  export let selected = null;
  export let error = null;
  let options = [];

  async function loadPegawai() {
    try {
      const pegawaiResponse = await client_fetch_json({
        method: 'GET',
        path: '/app/pegawai'
      });
      options = pegawaiResponse.items.map(p => {
        return {
          text: p.nama,
          value: p.nik
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  onMount(loadPegawai);
</script>

<FSelect
  options={options}
  error={error}
  name={name}
  bind:selected={selected}
/>
