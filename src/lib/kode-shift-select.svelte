<script>
  import FSelect from './fselect.svelte'
  import { kode_shift_options } from './options'

  export let name = '';
  export let selected = null;
  export let error = null;
</script>

<FSelect
  options={kode_shift_options}
  error={error}
  name={name}
  bind:selected={selected}
/>
