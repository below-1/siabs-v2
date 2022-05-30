<script>
  export let active = false;
</script>

<style>
   .toggle {
      box-shadow: 
        2px 0 0 0 #888, 
        0 2px 0 0 #888, 
        2px 2px 0 0 #888,
        2px 0 0 0 #888 inset, 
        0 2px 0 0 #888 inset;
   }
</style>

<button 
  type="button" 
  class="toggle px-4 py-1"
>
  <slot></slot>
</button>