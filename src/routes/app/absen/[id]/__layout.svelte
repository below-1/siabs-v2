<script>
  import { browser } from '$app/env'

  export async function load({ params, session, fetch }) {
    const response = await fetch(`/app/absen/${params.nik}/layout-data`, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
    const data = await response.json()
    return {
      status: 200,
      props: data
    }
</script>

<script>
  import { setContext, getContext, onMount } from 'svelte'
  import PageHeader from '$lib/page-header.svelte'
  import FButton from '$lib/fbutton.svelte'

  export let item = {};

  setContext('item', item);
</script>

<PageHeader>
  <div>
    <div class="text-2xl font-bold">Detail Absen</div>
  </div>
</PageHeader>

