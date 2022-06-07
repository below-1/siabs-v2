<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { client_fetch_json } from '$lib/http';
  import FField from '$lib/field.svelte';
  import FInput from '$lib/finput.svelte';
  import FButton from '$lib/fbutton.svelte';

  export let user = null;

  let oldUsername = user.username;
  let username = user.username;
  let password = '';
  let repeat_password = '';
  let loadingChangeUsername = false;

  async function changeUsername() {
    if (!browser) {
      return;
    }
    loadingChangeUsername = true;
    try {
      const response = await client_fetch_json({
        path: `/app/account/${oldUsername}`,
        payload: {
          username
        },
        method: 'POST'
      });
      console.log(response);
      console.log('response');
      alert('sukses mengubah akun');
      window.location.reload();
      // window.history.back();
    } catch (err) {
      console.log(err);
      alert('gagal mengubah username');
    } finally {
      loadingChangeUsername = false;
    }
  }

  onMount(() => {
    username = user.username;
  });
</script>

<div class="columns">
  <div class="column is-5">

    <div
      class="card mb-4"
    >
      <div class="card-header">
        <h1 class="card-header-title">Ganti Username</h1>
      </div>
      <div class="card-content">
        <FField label="Username">
          <FInput name="username" bind:value={username} />
        </FField>
        <FButton
          primary
          on:click={changeUsername}
        >
          simpan
        </FButton>
      </div>
    </div>

    <form
      method="POST"
      enctype="multipart/form-data"
      class="card mb-4"
    >
      <div class="card-header">
        <h1 class="card-header-title">Ganti Password</h1>
      </div>
      <div class="card-content">
        <FField label="Password">
          <FInput name="password" bind:value={password} />
        </FField>
        <FField label="Ulangi Password">
          <FInput name="repeat_password" bind:value={repeat_password} />
        </FField>
        <FButton
          primary
        >
          simpan
        </FButton>
      </div>
    </form>

    <div class="card">
      <div class="card-content">
        <FButton danger fullwidth>
          Hapus Akun
        </FButton>
      </div>
    </div>

  </div>
</div>
