<script>
  import {getContext } from 'svelte'

  import { browser } from '$app/env'
  import FButton from '$lib/fbutton.svelte'
  import FInput from '$lib/finput.svelte'
  import SearchBox from '$lib/search-box.svelte'
  import Loader from '$lib/loader.svelte'
  import debounce from '$lib/debounce'
  import PageHeader from '$lib/page-header.svelte'
  import { client_fetch_json } from '$lib/http'

  const cu = getContext('currentUser');
  const user = cu.getUser();

  export let items = [];
  let keyword = '';
  let loading = false;

  async function _loadUnitKerjas(keyword) {
    if (!browser) {
      return;
    }
    loading = true;
    try {
      const response = await client_fetch_json({
        method: 'GET',
        path: '/app/unit-kerja',
        params: {
          keyword
        }
      })
      items = response.items;
    } catch (err) {
      console.log(err);
      alert('gagal mengambil data unit kerja')
    } finally {
      loading = false;
    }
  }

  const loadUnitKerjas = debounce(_loadUnitKerjas, 500);

  $: loadUnitKerjas(keyword);
</script>

<PageHeader>
  <div class="columns is-vcentered has-text-weight-bold">
    <div class="column has-text-left-tablet has-text-centered-mobile">
      <h1 class="title">Unit Kerja</h1>
    </div>
    <div class="column has-text-right-tablet has-text-centered-mobile">
      <FButton 
        path="/app/unit-kerja/create"
        primary
      >
        tambah unit kerja
      </FButton>
    </div>
  </div>
</PageHeader>

<section class="section">
  <div class="container">
    <div class="mb-4">
      <SearchBox
        bind:keyword={keyword}
      />
    </div>
    {#if loading}
      <Loader />
    {:else}
      {#each items as item}
        <a 
          href={`/app/unit-kerja/${item.id}/edit-data`}
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
                <span>{item.tipe}</span>
                <span>{item.alamat}</span>
              </div>
            </div>
          </div>
        </a>
      {/each}
    {/if}
  </div>
</section>
