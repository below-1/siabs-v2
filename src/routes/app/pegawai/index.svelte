<script>
  import {getContext } from 'svelte'
  import { browser } from '$app/env'

  import PageHeader from '$lib/page-header.svelte'
  import FButton from '$lib/fbutton.svelte'
  import FInput from '$lib/finput.svelte'
  import { client_fetch_json } from '$lib/http'

  const cu = getContext('currentUser');
  const user = cu.getUser();

  let keyword = '';
  let limit = 10;
  export let items = [];

  async function searcItems(keyword) {
    if (!browser) {
      return;
    }
    const response = await client_fetch_json({
      method: 'GET',
      path: '/app/pegawai',
      params: {
        keyword,
        limit
      }
    });
    items = response.items;
  }

  async function loadNext() {
    if (items.length == 0) {
      return;
    }
    const last = items[items.length - 1];
    const params = {
      keyword,
      limit,
      after: last.nik
    };
    const response = await client_fetch_json({
      method: 'GET',
      path: '/app/pegawai',
      params
    });
    items = response.items;
  }

  $: searcItems(keyword);
</script>

<PageHeader>
  <div class="flex flex-col md:flex-row justify-between items-center gap-y-2">
    <h1 class="font-black text-3xl">Daftar Pegawai</h1>
    {#if user.tenant_admin}
    <FButton 
      size="lg"
      path="/app/pegawai/create"
      primary

    >
      tambah pegawai
    </FButton>
    {/if}
  </div>
</PageHeader>

<section class="container py-6">
  <div class="w-full flex flex-col mb-6">
    <div class="px-4 w-full md:w-1/3 mb-6">
      <FInput
        name="keyword"
        placeholder="Keyword..."
        bind:value={keyword}
      />
    </div>
    {#each items as item}
      <a 
        href={`/app/pegawai/${item.nik}/overview`}
        class="outer-padding border-b border-gray-200 py-4 flex items-center gap-x-4">
        <img
          class="w-12 h-12 rounded"
          src={item.avatar}
        />
        <div>
          <div class="font-bold text-lg">{item.nama}</div>
          <div class="text-xs">NIP:{item.nip} NIK:{item.nik}</div>
        </div>
        <div class="flex-grow"></div>
      </a>
    {/each}
  </div>

  <div class="px-4 mb-6">
    <FButton 
      on:click={loadNext} 
      outline
    >Muat Lebih Banyak</FButton>
  </div>
</section>
