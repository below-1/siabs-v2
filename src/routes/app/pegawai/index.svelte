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
    items = [
      ...items,
      ...response.items
    ]
  }

  $: searcItems(keyword);
</script>

<PageHeader>
  <div class="columns">
    <div class="column">
      <div class="title">Daftar Pegawai</div>
    </div>
    <div class="column has-text-right-tablet">
      {#if user.super_user}
        <FButton 
          path="/app/pegawai/create"
          primary
        >
          tambah pegawai
        </FButton>
        {/if}

    </div>
  </div>
</PageHeader>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <FInput
          name="keyword"
          placeholder="Keyword..."
          bind:value={keyword}
        />

        <div class="mb-4"></div>

        {#each items as item}
          <a 
            href={`/app/pegawai/${item.nik}/overview`}
            class="media"
          >
            <figure class="media-left">
              <p class="image is-48x48">
                <img
                  src={item.avatar}
                />
              </p>
            </figure>
            <div class="media-content">
              <div class="content hast-text-black" style="color: black;">
                <div>{item.nama}</div>
                <div class="is-size-7">
                  <span>{item.nik}</span>
                </div>
              </div>
            </div>
          </a>
        {/each}

        <div class="mb-4"></div>

        <FButton 
          on:click={loadNext} 
          outline
        >Muat Lebih Banyak</FButton>
      </div>
    </div>
  </div>
</section>
