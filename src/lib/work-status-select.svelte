<script>
  import FSelect from './fselect.svelte'
  import { work_status_options } from './options'

  export let name = '';
  export let selected = null;
  export let error = null;
</script>

<FSelect
  options={work_status_options}
  error={error}
  name={name}
  bind:selected={selected}
/>
