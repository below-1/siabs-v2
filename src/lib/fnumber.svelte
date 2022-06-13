<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let value;
  export let min;
  export let max;
  export let step;
  export let name = '';
  export let error = null;
  export let placeholder = '';
  export let readonly = false;
  export let disabled = false;
</script>

<input 
  class="input"
  name={name}
  {min}
  {max}
  {step}
  type="number"
  class:is-danger={error}
  bind:value={value}
  readonly={readonly}
  disabled={disabled}
  {placeholder}
  on:change
/>
{#if error}
  <small class="has-text-danger is-size-7">{error}</small>
{/if}