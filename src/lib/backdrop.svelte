<script>
  export let show = false;
</script>

<style scoped>
  .backdrop {
    position: fixed;
    top:  0;
    bottom: 0;
    left:  0;
    right:  0;
    background: rgba(250, 250, 250, 0.5);
  }
</style>

{#if show}
<div on:click|self={() => {
  show = false;
}} class="backdrop flex items-center justify-center md:p-4">
  <slot></slot>
</div>
{/if}
