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
  class="card"
>
  <div 
    class="card-header"
    class:has-background-danger={!valid}
  >
    <div class="card-header-title">
      <span class:has-text-white={!valid}>Login Form</span>
    </div>
  </div>
  <div class="card-content">
    <FField label="Username">
      <FInput
        name="username"
        error={errors.username}
      />
    </FField>
    <FField label="Password">
      <input 
        class="input" 
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