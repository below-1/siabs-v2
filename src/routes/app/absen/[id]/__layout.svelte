<script context="module">
  import { browser } from '$app/env'

  export async function load({ params, session, fetch }) {
    const response = await fetch(`/app/absen/${params.id}/layout-data`, {
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
  <div class="columns">
    <div class="column">
      <div class="title">Detail Absen</div>
      <div class="subtitle">{item.absen.id}</div>
    </div>
    <div class="column has-text-right-tablet">
      <FButton danger>Hapus</FButton>
    </div>
  </div>
</PageHeader>

<section class="section">
  <div class="container">
    <slot></slot>
  </div>
</section>

