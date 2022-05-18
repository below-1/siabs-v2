<script>
  export let value = '';
  export let name = '';
  export let error = null;
  export let placeholder = '';
  export let readonly = false;
  export let disabled = false;
</script>

<input 
  class="w-full rounded px-2 py-1 font-semibold text-gray-700 border disabled:bg-gray-100 disabled:opacity-75"
  name={name}
  class:border-red-600={error}
  class:border-2={error}
  bind:value={value}
  readonly={readonly}
  disabled={disabled}
  {placeholder}
/>
{#if error}
  <div class="text-xs text-red-500 font-semibold">{error}</div>
{/if}