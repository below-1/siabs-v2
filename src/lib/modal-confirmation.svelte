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
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<Backdrop bind:show={show}>
  <div 
    class="backdrop flex items-center justify-center"
    on:click|self={(event) => {
      show = false;
    }}
  >
    <div class="card">
      <div class="card-header">
        <h1 class="card-header-title">{title}</h1>
      </div>
      <div class="card-content">
        <h2 class="font-bold text-lg">{message}</h2>
        <div class="buttons">
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
  </div>
</Backdrop>


