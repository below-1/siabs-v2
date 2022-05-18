<script>
  import FButton from '$lib/fbutton.svelte'
  import { createEventDispatcher, getContext } from 'svelte'

  const step = getContext('step')
  const dispatch = createEventDispatcher()

  export let next_disabled = false;
  export let back_disabled = false;

  function on_next() {
    $step = $step + 1;
    dispatch('next');
  }

  function on_back() {
    $step = $step - 1;
  }
</script>

<div class="flex gap-x-4 px-4">
  <FButton outline disabled={back_disabled} on:click={on_back}>
    Kembali
  </FButton>
  <FButton primary disabled={next_disabled} on:click={on_next}>
    Selanjutnya
  </FButton>
</div>