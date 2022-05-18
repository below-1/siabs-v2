<script>
  import FSelect from './fselect.svelte'
  import { absen_type_options } from './options'

  export let name = '';
  export let selected = null;
  export let error = null;
</script>

<FSelect
  options={absen_type_options}
  error={error}
  name={name}
  bind:selected={selected}
/>
