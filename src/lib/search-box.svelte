<script>
  import Icon from '@iconify/svelte';

  export let keyword = '';
  export let placeholder = '#Keyword';
</script>

<style lang="scss">
  .SearchBox {
    background: rgb(245, 245, 250);
    padding: 8px 12px;
    display:  flex;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
  }

  .SearchBox:focus-within {
    background: hsl(171deg, 100%, 41%);
    font-weight: bold;
  }

  .SearchBox > input {
    flex-grow: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size:  1.2rem;
  }

  .SearchBox > input:focus {
    color: white;
  }

  .SearchBox > .search-icon {
    display: flex;
    align-items: center;
    font-size:  2rem;
    color:  #aaa;
  }

  .SearchBox:focus-within > .search-icon {
    color:  white;
  }
</style>

<div class="SearchBox">
  <div class="search-icon">
    <Icon icon="el:search" />
  </div>
  <input
    type="text"
    {placeholder}
    bind:value={keyword}
    on:keyup
  />
</div>
