<script>
  import FSelect from '$lib/fselect.svelte';
  import FInput from '$lib/finput.svelte';

  export let month;
  export let year;

  let monthOptions = [
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

<div class="is-flex" style="column-gap: 4px;">
  <FSelect
    bind:selected={month}
    options={monthOptions}
  />
  <input 
    class="input"
    type="number"
    min=2021
    max=2050
    bind:value={year}
  />
</div>
