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

<div class="flex items-center gap-x-2">
  <FSelect
    bind:selected={month}
    options={monthOptions}
  />
  <input 
    class="w-full rounded px-2 py-1 font-semibold text-gray-700 border disabled:bg-gray-100 disabled:opacity-75"
    type="number"
    min=2021
    max=2050
    bind:value={year}
  />
</div>
