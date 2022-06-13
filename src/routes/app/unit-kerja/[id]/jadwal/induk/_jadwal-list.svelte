<script>
  import { getContext, createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import day from '$lib/day';

  const dispatch = createEventDispatcher();
  const unitKerja = getContext('unitKerja');
  export let items = [];

  function onClickRow(date) {
    const start = day(date).startOf('day').toISOString()
    const end = day(date).endOf('day').toISOString()
    dispatch('detail', {
      start,
      end
    })
  }
</script>

<style>
  table td {
    vertical-align: middle;
  }
</style>

<table class="table is-fullwidth is-hoverable">
  <thead>
    <tr>
      <th class="has-text-centered">Hari</th>
      <th>Tanggal</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {#each items as dateGroup}
      <tr on:click={(event) => onClickRow(dateGroup.d)}>
        <td width="10%" style="background: rgb(250, 250, 250);">
          <div class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <div class="has-text-weight-bold is-size-5">{day(dateGroup.d).format('DD')}</div>
            <div class="is-size-6">{day(dateGroup.d).format('dddd')}</div>
          </div>
        </td>
        <td>
          {day(dateGroup.d).format('DD-MM-YYYY')}
        </td>
        <td>{dateGroup.total_absen}</td>
      </tr>
    {/each}
  </tbody>
</table>