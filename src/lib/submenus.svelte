<script>
  export let menus = [];
</script>

<div class="bg-gray-50 border-b">
  <div class="container flex items-center justify-start md:gap-x-4 whitespace-nowrap">
    {#each menus as menu}
      <a 
        href={menu.path}
        class="text-gray-600 px-4 py-2 hover:bg-gray-50 hover:bg-gray-200 rounded flex-grow md:flex-grow-0"
      >
        {menu.label}
      </a>
    {/each}
  </div>
</div>