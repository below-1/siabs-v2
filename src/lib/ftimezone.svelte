<script>
  import FSelect from '$lib/fselect.svelte';

  export let name = '';
  export let selected;
  export let error = null;

  const options = [
    {
      text: 'WIB',
      value: '+07:00'
    },
    {
      text: 'WITA',
      value: '+08:00'
    },
    {
      text: 'WIT',
      value: '+09:00'
    }
  ]
</script>

<FSelect
  options={options}
  error={error}
  name={name}
  bind:selected={selected}
/>
