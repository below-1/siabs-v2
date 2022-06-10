<script>
  import { getContext, createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  import Backdrop from '$lib/backdrop.svelte';
  import SearchBox from '$lib/search-box.svelte';
  import Loader from '$lib/loader.svelte';
  import debounce from '$lib/debounce';

  const dispatch = createEventDispatcher();
  const unitKerja = getContext('unitKerja')
  export let show = false;
  export let excludedNiks = [];
  let keyword = '';
  let loading = false;
  let items = [];

  $: searchPegawai(keyword);

  async function _searchPegawai(keyword) {
    loading = false;
    const url = new URL('/app/pegawai', $page.url)
    url.searchParams.set('keyword', keyword)
    url.searchParams.set('limit', 5)
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      items = data.items.filter(item => {
        return !excludedNiks.includes(item.nik)
      })
    } catch (err) {
      console.log(err);
    } finally {
      loading = false;
    }
  }

  const searchPegawai = debounce(_searchPegawai, 400);

  async function addPegawai(nik) {
    loading = true;
    try {
      const response = await fetch(`/app/pegawai/${nik}/unit-kerja`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_unit_kerja: unitKerja.id
        })
      })
      dispatch('created');
    } catch (err) {
      console.log(err);
      alert('gagal menambahkan pegawai kedalam unit kerja');
    } finally {
      loading = false;
    }
  }
</script>

<style lang="scss">
  .UKSearchPegawai {
    background: white;
    padding: 12px;
    box-shadow: 0 1px 6px 2px #eee;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .UKSearchPegawai .pegawai-list {
    display: flex;
    flex-direction: column;
  }

  .UKSearchPegawai .pegawai-list > li {
    display: flex;
    align-items: center;
    gap: 4px;
    border-bottom: 1px solid #eee;
    padding: 4px;
    cursor: pointer;
  }

  .UKSearchPegawai .pegawai-list > li:hover {
    background: $primary;
    color:  white;

    img {
      background: $info;
    }
  }

  .UKSearchPegawai .pegawai-list > li .text-content {
    display: flex;
    flex-direction: column;
  }

  .UKSearchPegawai .pegawai-list > li img {
    width: 64px;
    height: 64px;
    background: #eee;
    border-radius: 4px;
  }
</style>

<Backdrop bind:show={show}>
  <div class="UKSearchPegawai">
    <SearchBox
      placeholder="Nama Pegawai..."
      bind:keyword={keyword}
    />
    {#if loading}
      <Loader/>
    {:else}
      <ul class="pegawai-list">
        {#each items as item}
          <li
            on:click={() => addPegawai(item.nik)}
          >
            <img
              src={item.avatar}
              alt="avatar"
            />
            <div class="text-content">
              <span>{item.nama}</span>
              <span style="font-size: 0.8rem;">{item.nik}</span>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</Backdrop>
