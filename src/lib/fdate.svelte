<script>
  export let value = '';
  export let name = '';
  export let error = null;
</script>

<input 
  type="date"
  class="rounded px-2 py-1 font-semibold text-gray-700 border"
  name={name}
  class:border-red-600={error}
  class:border-2={error}
  bind:value={value}
/>
{#if error}
  <div class="text-xs text-red-500 font-semibold">{error}</div>
{/if}