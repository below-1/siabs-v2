<script>
  export let name = '';
  export let required = false;
</script>

<input 
  class="rounded px-2 py-1 font-semibold text-gray-700 border"
  name={name}
  required={required}
  type="file"
/>