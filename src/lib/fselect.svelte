<script>
  export let name = '';
  export let selected = null;
  export let options = [];
  export let error = null;
</script>

<div class="select is-fullwidth">
  <select
    name={name}
    class:is-danger={error}
    bind:value={selected}
    on:change
  >
    {#each options as option}
      <option value={option.value}>{option.text}</option>
    {/each}
  </select>
</div>
{#if error}
  <div class="is-size-7 has-text-danger">{error}</div>
{/if}
