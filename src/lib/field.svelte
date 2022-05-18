<script>
  export let label = '';
  export let error = null;
</script>

<div class="flex flex-col gap-y-1">
  <label class="text-sm text-gray-600 font-semibold">{label}</label>
  <slot></slot>
</div>