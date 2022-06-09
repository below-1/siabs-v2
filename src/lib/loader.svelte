<script>
  import Icon from '@iconify/svelte';

  export let size = '64px';
</script>

<style>
  .app-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    padding:  24px;
  }

  .app-loader > div {
    flex-grow:  1;
  }
</style>


<div class="app-loader has-background-light has-text-info">
  <Icon icon="line-md:loading-twotone-loop" width={size} height={size} />
</div>