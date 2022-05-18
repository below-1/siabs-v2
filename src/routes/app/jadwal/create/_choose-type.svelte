<script>
  import { getContext } from 'svelte'

  import Actions from './_actions.svelte'
  import TypeOption from './_type-option.svelte'

  const step = getContext('step');
  export let tipe = null;

  $: next_disabled = !tipe;
</script>

<div class="flex flex-col gap-y-4 p-4">
  <TypeOption
    title="Jadwal Tetap"
    subtitle="Jadwal Yang berulang dalam jangka waktu tertentu"
    active={tipe == 'fixed'}
    on:click={() => {
      tipe = 'fixed';
    }}
  />
  <TypeOption
    title="Jadwal One Shoot"
    subtitle="Jadwal Untuk Satu Kali Shift"
    active={tipe == 'one-shoot'}
    on:click={() => {
      tipe = 'one-shoot';
    }}
  />
</div>

<Actions 
  back_disabled={true}
  {next_disabled}
/>