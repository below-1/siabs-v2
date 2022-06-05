<script>
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import day from '$lib/day';
  import FButton from '$lib/fbutton.svelte';
  import CreateDialog from './_create.svelte';

  const unitKerja = getContext('unitKerja');
  const date = $page.params.date;
  export let items = [];
  let showCreateDialog = false;
  let shift1Items = [];
  let shift2Items = [];

  function splitItems(items) {
    let _shift1 = [];
    let _shift2 = [];
    items.forEach(item => {
      if (item.kode_shift == 1) {
        _shift1.push(item);
      } else {
        _shift2.push(item);
      }
    });
    shift1Items = _shift1;
    shift2Items = _shift2;
  }

  async function reload() {
    
    try {
      const response = await fetch(`/app/unit-kerja/${unitKerja.id}/jadwal/satpel/${date}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      });
      const data = await response.json();
      items = data.items;
    } catch (err) {
      console.log(err);
    }
  }

  $: splitItems(items);
</script>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="title">{day(date).format('dddd DD MMMM, YYYY')}</h1>
      </div>
      <div class="column has-text-right">
        <FButton primary on:click={() => {
          showCreateDialog = true;
        }}>
          Tambah Pegawai
        </FButton>
      </div>
    </div>
    <div class="columns">
      <div class="column is-8 is-flex is-align-items-center is-flex-wrap-wrap" 
        style="row-gap:4px; column-gap: 4px;">
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="subtitle is-size-4">08:00 - 20:00</div>
        {#each shift1Items as item}
          <a 
            href={`/app/absen/${item.id}/overview`}
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
                  <span>{item.nip}</span>
                  <span>{item.nik}</span>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
      <div class="column">
        <div class="subtitle is-size-4">20:00 - 08:00</div>
        {#each shift2Items as item}
          <a 
            href={`/app/absen/${item.id}/overview`}
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
                  <span>{item.nip}</span>
                  <span>{item.nik}</span>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<CreateDialog
  bind:show={showCreateDialog}
  on:created={reload}
/>
