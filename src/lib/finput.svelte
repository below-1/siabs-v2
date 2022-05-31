<script>
  export let value = '';
  export let name = '';
  export let error = null;
  export let placeholder = '';
  export let readonly = false;
  export let disabled = false;
</script>

<input 
  class="input"
  name={name}
  class:is-danger={error}
  bind:value={value}
  readonly={readonly}
  disabled={disabled}
  {placeholder}
/>
{#if error}
  <small class="has-text-danger">{error}</small>
{/if}