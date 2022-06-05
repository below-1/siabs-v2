<script>
  import day from '$lib/day';
  import PageHeader from '$lib/page-header.svelte';
  import Icon from '@iconify/svelte';

  export let nik;
  export let start;
  export let end;
  export let items = [];
</script>

<PageHeader>
  <h1 class="title">Tabrakan Jadwal Terdeteksi {items.length}</h1>
</PageHeader>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="box has-background-danger has-text-white">
          <p>
            Sistem mendeteksi terjadinya tabrakan pada 
            {day(start).format('HH:mm dddd, DD MMMM, YYYY')} - 
            {day(end).format('HH:mm dddd, DD MMMM, YYYY')}
          </p>
        </div>
        <div class="is-size-6">Jadwal Yang Bertabrakan sebagai berikut:</div>

        <div class="table-container">
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
                    <div class="is-size-7 has-text-weight-bold">
                      {#if item.absen.tipe == 'dl'}
                        Dinas Luar
                      {:else if item.absen.tipe == 'wfo'}
                        Work From Office
                      {:else}
                        Work From Home
                      {/if}
                    </div>
                  </td>
                  <td class="is-size-7 has-text-weight-bold">
                    {#if item.absen.tipe == 'dl'}
                      00:00 - 23:59
                    {:else if item.absen.shift == 1}
                      08:00 - 16:00
                    {:else}
                      20:00 - 04:00
                    {/if}
                  </td>
                  <td>
                    <a href={`/app/absen/${item.absen.id}/overview`} class="button is-small">
                      <Icon icon="bi:three-dots" class="icon has-text-info"></Icon>
                    </a>
                    <button 
                      class="button is-small"
                      on:click={() => {
                        showDeleteDialogFor(item.id);
                      }}
                    >
                      <Icon icon="fa-solid:trash-alt" class="icon has-text-danger"></Icon>
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</section>

