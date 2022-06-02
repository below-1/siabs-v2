<script>
  import { getContext } from 'svelte';
  import FField from '$lib/field.svelte';
  import FInput from '$lib/finput.svelte';
  import FButton from '$lib/fbutton.svelte';

  const cu = getContext('currentUser');
  const user = cu.getUser();

  let username = user.username;

  let password = '';
  let repeat_password = '';
</script>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-5">

        <form
          method="POST"
          enctype="multipart/form-data"
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
            >
              simpan
            </FButton>
          </div>
        </form>

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
  </div>
</section>

<div class="container px-4 py-12 flex flex-col gap-y-6">

</div>