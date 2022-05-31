<script>
  import ToggleButton from './_toggle-button.svelte';
  export let active = 'jadwal';

  const items = [
    { text: 'Jadwal', value: 'jadwal' },
    { text: 'Pegawai', value: 'pegawai' }
  ]
</script>

<div class="tabs is-toggle mb-0">
  <ul>
    {#each items as item}
      <li 
        class:is-active={active == item.value}
        on:click={(event) => {
          active = item.value;
        }}
      >
        <a>{item.text}</a>
      </li>
    {/each}
  </ul>
</div>
