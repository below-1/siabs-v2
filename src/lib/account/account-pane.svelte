<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import Icon from '@iconify/svelte';
  import { client_fetch_json } from '$lib/http';
  import { 
    required,
    watchError, 
    combineErrors 
  } from '$lib/validation';
  import FField from '$lib/field.svelte';
  import FInput from '$lib/finput.svelte';
  import FPassword from '$lib/fpassword.svelte';
  import FButton from '$lib/fbutton.svelte';

  export let user = null;
  let oldUsername = user.username;
  let username = user.username;
  let password = '';
  let repeat_password = '';
  let loadingChangeUsername = false;
  let loadingChangePassword = false;
  let showPasswords = false;

  function passwordEqual(v) {
    if (v != password) {
      return 'Password tidak cocok';
    }
  }

  $: passwordError = watchError([
      required('password harus diisi')
    ])(password);
  $: repeatPasswordError = watchError([
      required('ulangi password'),
      passwordEqual
    ])(repeat_password);
  $: someChangePasswordError = combineErrors(
    passwordError, 
    repeatPasswordError);

  async function changeUsername() {
    if (!browser) {
      return;
    }
    loadingChangeUsername = true;
    try {
      const response = await client_fetch_json({
        path: `/app/account/${oldUsername}/username`,
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

  async function changePassword() {
    if (!browser) {
      return;
    }
    loadingChangePassword = true;
    try {
      const response = await fetch(`/app/account/${oldUsername}/password`, {
        method: 'POST',
        body: JSON.stringify({
          password
        })
      });
      alert('sukses mengubah password');

    } catch (err) {
      console.log(err);
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

    <div
      class="card mb-4"
    >
      <div class="card-header">
        <h1 class="card-header-title">Ganti Password</h1>
      </div>
      <div class="card-content">
        {#if showPasswords}
          <FField label="Password">
            <FInput
              name="password" 
              bind:value={password} 
              error={passwordError}
            />
          </FField>
          <FField label="Ulangi Password">
            <FInput
              name="repeat_password" 
              bind:value={repeat_password} 
              error={repeatPasswordError}
            />
          </FField>
        {:else}
          <FField label="Password">
            <FPassword
              name="password" 
              bind:value={password} 
              error={passwordError}
            />
          </FField>
          <FField label="Ulangi Password">
            <FPassword
              name="repeat_password" 
              bind:value={repeat_password} 
              error={repeatPasswordError}
            />
          </FField>
        {/if}
        <div class="flex items-center">
          <FButton 
            outline
            on:click={() => {
              showPasswords = !showPasswords;
            }}
          >
            <Icon icon="bi:eye-fill"></Icon>
          </FButton>
          <FButton
            primary
            on:click={changePassword}
          >
            simpan
          </FButton>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-content">
        <FButton danger fullwidth>
          Hapus Akun
        </FButton>
      </div>
    </div>

  </div>
</div>
