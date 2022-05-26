<script>
  import { getContext } from 'svelte';
  import PageHeader from '$lib/page-header.svelte';

  const cu = getContext('currentUser');
  const user = cu.getUser();
</script>

<PageHeader>
  <h1 class="text-2xl font-bold">Akun {user.username}</h1>
</PageHeader>

<slot>
</slot>
