<script>
  import Icon from '@iconify/svelte';
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import { client_fetch_json } from '$lib/http';
  import day from '$lib/day';
  import Loader from '$lib/loader.svelte';
  import FDate from '$lib/fdate.svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';

  let date = $page.params.date;
  let items = [];
  let loading = false;
  $: getItems(date);

  async function getItems(date) {
    if (!browser) {
      return;
    }
    loading = true;
    try {
      const response = await client_fetch_json({
        path: `/app/unit-kerja/${$page.params.id}/jadwal/induk/on-date`,
        params: {
          start: day(date).startOf('day').toISOString(),
          end: day(date).endOf('day').toISOString()
        }
      });
      items = response.items;
    } catch (err) {
      console.log(err);
      alert('gagal mengambil data');
    } finally {
      loading = false;
    }
  }
</script>

<section class="section">
  <div class="container">
    <div class="columns is-vcentered">
      <div class="column">
        <h1 class="title is-size-4">
          Jadwal {day(date).format('dddd, DD MMMM, YYYY')}
        </h1>
      </div>
      <div class="column is-3 is-flex is-align-items-center">
        <label class="is-size-5 mr-2">Tanggal</label>
        <FDate
          bind:value={date}
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        {#if loading}
          <Loader />
        {:else}
          {#each items as item}
            <article class="media">
              <figure class="media-left">
                <p class="image is-48x48">
                  <img
                    src={item.avatar}
                  />
                </p>
              </figure>
              <div class="media-content is-flex" style="align-items: center;">
                <div class="content hast-text-black" style="color: black; flex-grow: 1;">
                  <div>{item.nama}</div>
                  <div class="is-size-7">
                    <span>{item.nip}</span>
                    <span>{item.nik}</span>
                  </div>
                  <div class="is-flex-mobile is-hidden-tablet is-size-7">
                    <a>hapus</a>
                    <span class="px-1">.</span>
                    <a href={`/app/absen/${item.id}/overview`}>detail</a>
                  </div>
                </div>
                <div class="is-flex-tablet is-hidden-mobile">
                  <button class="button is-danger is-small mr-2">
                    <Icon icon="mdi:delete" class="is-small icon" />
                  </button>
                  <a href={`/app/absen/${item.id}/overview`} class="button is-info is-small mr-2">
                    <Icon icon="mdi:eye" class="is-small icon" />
                  </a>
                </div>
              </div>
            </article>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</section>
