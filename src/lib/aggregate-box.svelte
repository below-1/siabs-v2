<script>
  import Icon from '@iconify/svelte';

  export let label = '';
  export let value = '';
  export let icon = '';
  export let color = '';

  $: bgclass = `has-background-${color}`;
</script>

<div class="column is-6-mobile">
  <div class="box p-2" style="display: flex;">
    <div class={`${bgclass} has-text-white p-4`}>
      <Icon {icon} class="icon is-medium" />
    </div>
    <div style="flex-grow: 1; display: flex; flex-direction: column;" class="px-4">
      <div class="heading is-size-7" style="flex-grow: 1;">{label}</div>
      <div class="is-size-4 has-text-weight-bold">{value}</div>
    </div>
  </div>
</div>