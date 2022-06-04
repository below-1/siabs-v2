<script>
  import { getContext } from 'svelte';
  import { browser } from '$app/env';
  import AccountPane from '$lib/account/account-pane.svelte';

  const pegawai = getContext('pegawai');
</script>

<section class="section">
  <div class="container">
    <h1 class="title">Data Akun {pegawai.nama}</h1>
    <AccountPane
      user={pegawai.user}
    />
  </div>
</section>