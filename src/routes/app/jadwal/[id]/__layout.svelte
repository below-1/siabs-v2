<script context="module">
  import { browser } from '$app/env';
  import { page } from '$app/stores';

  export async function load({ params, session, fetch }) {
    const response = await fetch(`/app/jadwal/${params.id}/layout-data`, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
    return {
      status: 200,
      props: data
    }
  }
</script>

<script>
  import { setContext } from 'svelte'

  export let fixed = null;
  export let shift = null;

  setContext('fixed', fixed);
  setContext('shift', shift);
</script>

<slot>
</slot>