<script>
  export let label = '';
  export let error = null;
</script>

<div class="field">
  <label class="label">{label}</label>
  <div class="control">
    <slot></slot>
  </div>
</div>