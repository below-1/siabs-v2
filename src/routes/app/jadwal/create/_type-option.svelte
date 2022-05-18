<script>
  export let title = '';
  export let subtitle = '';
  export let active = false;
</script>

<button 
  on:click
  class="flex flex-col items-center border rounded bg-gray-100 p-4"
  class:border-2={active}
  class:border-purple-700={active}
  class:font-black={active}
>
  <div class="text-lg">{title}</div>
  <div class="text-xs">{subtitle}</div>
</button>
