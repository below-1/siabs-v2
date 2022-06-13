<script>
  import { createEventDispatcher } from 'svelte';
  import FSelect from '$lib/fselect.svelte';

  const dispatch = createEventDispatcher();

  export let month;
  const monthOptions = [
    { text: 'Januari', value: 0 },
    { text: 'Februari', value: 1 },
    { text: 'Maret', value: 2 },
    { text: 'April', value: 3 },
    { text: 'Mei', value: 4 },
    { text: 'Juni', value: 5 },
    { text: 'Juli', value: 6 },
    { text: 'Agustus', value: 7 },
    { text: 'September', value: 8 },
    { text: 'Oktober', value: 9 },
    { text: 'November', value: 10 },
    { text: 'Desember', value: 11 },
  ];
</script>

<FSelect
  selected={month}
  options={monthOptions}
  on:change={(event) => {
    dispatch('change', parseInt(event.target.value))
  }}
/>
