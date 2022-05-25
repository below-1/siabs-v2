<script>
  import { getContext } from 'svelte';
  import PageHeader from '$lib/page-header.svelte'
  import ListItem from './_list-item.svelte'

  const unitKerja = getContext('unitKerja');

  export let items = [];
</script>

<PageHeader>
  <h1 class="text-2xl font-bold">Jadwal {unitKerja.nama}</h1>
</PageHeader>

<div class="container px-4 py-6">
  {#each items as item}
    <ListItem
      item={item}
    />
  {/each}
</div>
