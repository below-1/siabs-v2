<script>
  import { getContext } from 'svelte'

  import Actions from './_actions.svelte'
  import TypeOption from './_type-option.svelte'

  const step = getContext('step');
  export let tipe = null;

  $: next_disabled = !tipe;
</script>

<div class="container mx-auto">
  <div class="w-full md:w-3/4 flex flex-col gap-y-4 p-4">
    <TypeOption
      title="Jadwal Tetap"
      subtitle="Jadwal Yang berulang dalam jangka waktu tertentu"
      active={tipe == 'fixed'}
      on:click={() => {
        tipe = 'fixed';
      }}
    />
    <TypeOption
      title="Jadwal Shift"
      subtitle="Satu hari terdiri dari satu atau lebih Shift"
      active={tipe == 'shift'}
      on:click={() => {
        tipe = 'shift';
      }}
    />
  </div>
  <Actions 
    back_disabled={true}
    {next_disabled}
  />
</div>
