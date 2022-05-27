<script>
  import PageHeader from '$lib/page-header.svelte';

  export let item = null;
</script>

<PageHeader>
  <div>
    <h1 class="text-2xl font-bold">Edit Shift</h1>
    <h2 class="text-sm text-gray-600">{item.id}</h2>
  </div>
</PageHeader>
