<script>
  export let size = 'md';
  export let primary = false;
  export let danger = false;
  export let outline = false;
  export let loading = false;
  export let disabled = false;
  export let path = null;
  export let fullwidth = false;
</script>

{#if path}
  <a
    href={path}
    on:click
    class="button"
    class:is-primary={primary}
    class:is-danger={danger}
    class:is-outlined={outline}
    class:is-large={size == 'lg'}
    class:is-small={size == 'sm'}
    disabled={disabled ? 'disabled' : undefined}
    class:is-loading={loading}
    class:is-fullwidth={fullwidth}
  >
    <slot></slot>
  </a>
{:else}
  <button 
    on:click
    class="button"
    class:is-primary={primary}
    class:is-danger={danger}
    class:is-outlined={outline}
    class:is-large={size == 'lg'}
    class:is-small={size == 'sm'}
    disabled={disabled}
    class:is-loading={loading}
    class:is-fullwidth={fullwidth}
  >
    {#if loading}
      <svg 
        class="animate-spin mr-1 h-5 w-5" 
        class:text-white={primary}
        class:text-black={outline}
        class:text-gray-500={!primary || !outline}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot></slot>
  </button>
{/if}