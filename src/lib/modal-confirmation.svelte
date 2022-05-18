<script>
  import Backdrop from '$lib/backdrop.svelte'
  import FButton from '$lib/fbutton.svelte'

  export let show = false;
  export let title = '';
  export let message = '';
  export let onYes = null;

  $: wrappedOnYes = async () => {
    if (onYes) {
      await onYes();
    }
    show = false;
  }
</script>

<style>
  .backdrop {
    position: fixed;
    background: rgba(250, 250, 250, 0.6);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding:  12px;
  }
</style>

<Backdrop bind:show={show}>
  <div class="backdrop flex items-center justify-center">
    <div class="rounded bg-white border-2 border-red-600 shadow-xl flex flex-col">
      <div class="border-b py-4 px-4">
        <h1 class="font-bold text-xl text-gray-700">{title}</h1>
      </div>
      <div class="p-4 border-b">
        <h2 class="font-bold text-lg">{message}</h2>
      </div>
      <div class="p-4 flex items-center gap-x-4">
        <FButton outline on:click={() => {
          show = false;
        }}>Batal</FButton>
        {#if onYes}
          <FButton danger on:click={wrappedOnYes}>
            Lanjutkan
          </FButton>
        {/if}
      </div>
    </div>
  </div>
</Backdrop>


