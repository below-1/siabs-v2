<script>
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import day from '$lib/day';
  import { client_fetch_json } from '$lib/http';
  import PageHeader from '$lib/page-header.svelte';
  import FDate from '$lib/fdate.svelte';

  let items = [];
  let date = day($page.params.date).format('YYYY-MM-DD');

  async function getData(date) {
    if (!browser) {
      return;
    }
    console.log(day(date).toDate());
    const start = day(date).startOf('day').toISOString();
    const end = day(date).endOf('day').toISOString();
    console.log(`[client] start = ${start}`);
    console.log(`[client] end = ${end}`);
    try {
      const response = await client_fetch_json({
        path: `/app/jadwal/on-date`,
        params: {
          start,
          end
        }
      });
      items = response.items;
    } catch (err) {
      console.log(err);
      alert('gagal mengambil data jadwal');
    }
  }

  $: getData(date);
</script>

<style>
  table td {
    vertical-align: middle
  }
</style>

<PageHeader>
  <div class="columns">
    <div class="column is-8">
      <h1 class="title">Detail Jadwal</h1>
    </div>
    <div class="column is-4">
      <FDate bind:value={date} />
    </div>
  </div>
</PageHeader>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Pegawai</th>
              <th>Unit Kerja</th>
              <th>Status</th>
              <th>Waktu</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#each items as item}
              <tr>
                <td>
                  <div style="display: flex; align-items: center;">
                    <figure class="image is-32x32 mr-4">
                      <img src={item.pegawai.avatar} />
                    </figure>
                    <div>
                      <div class="is-size-6 has-text-weight-bold">{item.pegawai.nama}</div>
                      <div class="is-size-7">{item.pegawai.nik}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {#if item.absen.tipe != 'dl'}
                    <div style="display: flex; align-items: center;">
                      <figure class="image is-32x32 mr-4">
                        <img src={item.unit_kerja.avatar} />
                      </figure>
                      <div>
                        <div class="is-size-6 has-text-weight-bold">{item.unit_kerja.nama}</div>
                        <div class="is-size-7">{item.unit_kerja.alamat}</div>
                      </div>
                    </div>
                  {/if}
                </td>
                <td>
                  <div class="is-size-6">
                    {#if item.absen.tipe == 'dl'}
                      Dinas Luar
                    {:else if item.absen.tipe == 'wfo'}
                      Work From Office
                    {:else}
                      Work From Home
                    {/if}
                  </div>
                </td>
                <td>
                  {#if item.absen.tipe == 'dl'}
                    00:00 - 23:59
                  {:else if item.absen.shift == 1}
                    08:00 - 16:00
                  {:else}
                    20:00 - 04:00
                  {/if}
                </td>
                <td>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
