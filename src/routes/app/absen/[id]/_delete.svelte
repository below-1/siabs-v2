<script>
  import { getContext } from 'svelte';
  import { client_fetch_json } from '$lib/http';

  export let show = false;
  const item = getContext('item');
  let loading = false;

  async function remove() {
    loading = true;
    try {
      const response = await client_fetch_json({
        path: `/app/absen/${item.absen.id}/remove`,
        method: 'GET'
      });
      window.location = '/app/dashboard';
    } catch (err) {
      console.log(err);
      alert('gagal menghapus absen');
    }
  }
</script>

<div 
  class="modal"
  class:is-active={show}
>
  <div 
    class="modal-background"
    on:click|self={(event) => {
      show = false;
    }}
  ></div>
  <div class="modal-content">
    <div class="has-background-white p-4">
      <p class="is-size-6">Anda akan menghapus data absen {item.absen.id}</p>
      <div class="buttons">
        <button class="button is-small">batalkan</button>
        <button 
          class="button is-small is-danger"
          on:click={remove}
          class:is-loading={loading}
        >lanjutkan</button>
      </div>
    </div>
  </div>
</div>
