<script>
  import { getContext } from 'svelte';
  import FField from '$lib/field.svelte';
  import FInput from '$lib/finput.svelte';
  import FButton from '$lib/fbutton.svelte';
  import AccountPane from '$lib/account/account-pane.svelte';

  const cu = getContext('currentUser');
  const user = cu.getUser();

  let username = user.username;

  let password = '';
  let repeat_password = '';
</script>

<section class="section">
  <div class="container">
    <AccountPane
      {user}
    />
  </div>
</section>
