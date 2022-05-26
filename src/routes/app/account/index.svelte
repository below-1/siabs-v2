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

<div class="container px-4 py-12 flex flex-col gap-y-6">
  
  <form
    method="POST"
    enctype="multipart/form-data"
    class="w-1/2 p-4 rounded border flex flex-col gap-y-4"
  >
    <h1 class="text-xl font-semibold">Ganti Username</h1>
    <FField label="Username">
      <FInput name="username" bind:value={username} />
    </FField>
    <FButton
      primary
    >
      simpan
    </FButton>
  </form>

  <form
    method="POST"
    enctype="multipart/form-data"
    class="w-1/2 p-4 rounded border flex flex-col gap-y-4"
  >
    <h1 class="text-xl font-semibold">Ganti Password</h1>
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
  </form>

  <div class="p-4 rounded border flex flex-col w-1/2">
    <FButton danger>
      Hapus Akun
    </FButton>
  </div>

</div>