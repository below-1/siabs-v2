<script>
  export let value = '';
  export let name = '';
  export let error = null;
</script>

<input 
  type="date"
  class="input"
  name={name}
  class:border-red-600={error}
  class:border-2={error}
  bind:value={value}
/>
{#if error}
  <div class="is-size-7 has-text-danger font-semibold">{error}</div>
{/if}