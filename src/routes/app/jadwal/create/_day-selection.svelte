<script>
  const labels = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu']
  export let flags = [];
</script>

<div class="flex flex-col gap-y-2">
  {#each flags as flag, i}
    <div class="flex items-center gap-x-4">
      <input type="checkbox" bind:checked={flag} />
      <label>{labels[i]}</label>
    </div>
  {/each}
</div>
