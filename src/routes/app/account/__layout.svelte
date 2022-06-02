<script>
  import { getContext } from 'svelte';
  import PageHeader from '$lib/page-header.svelte';

  const cu = getContext('currentUser');
  const user = cu.getUser();
</script>

<PageHeader>
  <h1 class="title">Akun {user.username}</h1>
</PageHeader>

<slot>
</slot>
