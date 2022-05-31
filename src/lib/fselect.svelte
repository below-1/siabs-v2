<script>
  export let name = '';
  export let selected = null;
  export let options = [];
  export let error = null;
</script>

<div class="select">
  <select
    name={name}
    class:border-red-600={error}
    class:border-2={error}
    bind:value={selected}
  >
    {#each options as option}
      <option value={option.value}>{option.text}</option>
    {/each}
  </select>
</div>
{#if error}
  <div class="text-xs text-red-500 font-semibold">{error}</div>
{/if}
