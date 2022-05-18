<svelte:head>
  <title>SIABS -- Signin</title>
</svelte:head>

<script>
  import { isEmpty } from '$lib/util'
  import FInput from '$lib/finput.svelte'
  import FField from '$lib/field.svelte'
  import FButton from '$lib/fbutton.svelte'

  export let errors = {};
  $: valid = !isEmpty(errors);
</script>

<form 
  method="POST" 
  enctype="multipart/form-data" 
  class="bg-white border rounded"
>
  <div 
    class="p-4 text-lg"
    class:bg-red-500={!valid}
    class:text-white={!valid}
  >
    <p 
      class="card-header-title" 
      class:has-text-white={!valid}
    >
      Login ke dalam sistem
    </p>
  </div>

  <div class="flex flex-col gap-y-4 p-4">
    <FField label="Username">
      <input 
        class="border p-2 rounded" 
        type="text"
        class:is-danger={errors.username}
        required 
        name="username"
      />
      {#if errors.username}
        <p class="help is-danger">{errors.username}</p>
      {/if}
    </FField>
    <FField label="Password">
      <input 
        class="border p-2 rounded" 
        class:is-danger={errors.password}
        type="password" 
        required 
        name="password" 
      />
      {#if errors.password}
        <p class="help is-danger">{errors.password}</p>
      {/if}
    </FField>

    <FButton primary>
      masuk
    </FButton>
  </div>
</form>