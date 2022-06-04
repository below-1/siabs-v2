<script>
  import Icon from '@iconify/svelte';

  export let status;
  export let label;

  $: displayProperties = getDisplayProperties(status);

  function getDisplayProperties(status) {
    let icon = null;
    let color = null;
    let text = '';
    if (status == 'in-time') {
      icon = 'bsx:like';
      color = 'success';
      text = 'Tepat Waktu';
    } else if (status == 'late') {
      icon = 'bi:clock-fill';
      color = 'warning';
      text = 'Terlambat';
    } else if (status == 'alpa') {
      icon = 'ic:round-dangerous';
      color = 'danger';
      text = 'Alpa';
    } else {
      icon = 'eos-icons:loading';
      color = 'light';
      text = 'Belum Diketahui';
    }
    return {
      icon,
      color,
      text
    }
  }
</script>

<article class="media mb-4" style="display: flex; align-items: center;">
  <figure class={`media-left has-text-${displayProperties.color}`}>
    <Icon icon={displayProperties.icon} class="image is-64x64" />
  </figure>
  <div class="media-content">
    <div class="content hast-text-black">
      <div class="is-size-5 has-text-weight-bold">{displayProperties.text}</div>
      <div class="is-size-7">{label}</div>
    </div>
  </div>
</article>