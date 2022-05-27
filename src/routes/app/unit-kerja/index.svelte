<script>
  import {getContext } from 'svelte'

  import { browser } from '$app/env'
  import FButton from '$lib/fbutton.svelte'
  import FInput from '$lib/finput.svelte'
  import PageHeader from '$lib/page-header.svelte'
  import { client_fetch_json } from '$lib/http'

  const cu = getContext('currentUser');
  const user = cu.getUser();

  export let items = [];
  let keyword = '';

  async function loadUnitKerjas(keyword) {
    if (!browser) {
      return;
    }
    const response = await client_fetch_json({
      method: 'GET',
      path: '/app/unit-kerja',
      params: {
        keyword
      }
    })
    items = response.items;
  }

  $: loadUnitKerjas(keyword);
</script>

<PageHeader>
  <div class="flex flex-col md:flex-row justify-between items-center gap-y-2">
    <h1 class="font-black text-3xl">Unit Kerja</h1>
    {#if user.tenant_admin}
    <FButton 
      size="lg"
      path="/app/unit-kerja/create"
      primary
    >
      tambah unit kerja
    </FButton>
    {/if}
  </div>
</PageHeader>

<section class="container">
  <div class="w-full py-6 flex flex-col">
    <div class="px-4 w-full md:w-1/3">
      <FInput
        name="keyword"
        placeholder="Keyword..."
        bind:value={keyword}
      />
    </div>
    {#each items as item}
      <a 
        href={`/app/unit-kerja/${item.id}/edit-data`}
        class="px-4 border-b border-gray-200 py-4 flex md:items-center gap-x-4"
      >
        <img
          class="w-10 h-10 rounded"
          src={item.avatar}
        />
        <div>
          <div class="font-bold">{item.nama}</div>
          <div class="text-xs">
            <span class="py-0.5 px-3 rounded bg-gray-200 rounded">{item.tipe}</span>
            <span class="">{item.alamat}</span>
          </div>
        </div>
        <div class="flex-grow"></div>
      </a>
    {/each}
  </div>
</section>
