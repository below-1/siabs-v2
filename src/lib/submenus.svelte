<script>
  export let menus = [];
</script>

<div class="tabs">
  <ul>
    {#each menus as menu}
      <li>
        <a href={menu.path}>{menu.label}</a>
      </li>
    {/each}
  </ul>
</div>
