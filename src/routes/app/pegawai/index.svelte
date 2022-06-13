<script>
  import {getContext } from 'svelte'
  import { browser } from '$app/env'
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import PageHeader from '$lib/page-header.svelte'
  import FButton from '$lib/fbutton.svelte'
  import FInput from '$lib/finput.svelte'
  import SearchBox from '$lib/search-box.svelte'
  import Loader from '$lib/loader.svelte'
  import { client_fetch_json } from '$lib/http'
  import debounce from '$lib/debounce'

  const cu = getContext('currentUser');
  const user = cu.getUser();

  export let keyword = '';
  export let items = [];
  let limit = 10;
  let loading = false;

  async function _searchItems(keyword) {
    if (!browser) {
      return;
    }
    const url = new URL($page.url);
    url.searchParams.set('keyword', keyword);
    goto(url);
  }
  const searchItems = debounce(_searchItems, 500);

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
        <SearchBox
          bind:keyword={keyword}
          on:keyup={event => {
            searchItems(event.target.value);
          }}
        />
        <div class="py-4">
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
        </div>
        <FButton 
          on:click={loadNext} 
          outline
        >Muat Lebih Banyak</FButton>
      </div>
    </div>
  </div>
</section>
