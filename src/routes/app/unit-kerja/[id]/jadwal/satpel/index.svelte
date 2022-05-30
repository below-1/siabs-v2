<script>
  import { getContext } from 'svelte';
  import MonthYearSelect from '$lib/month-year-select.svelte';
  import day from '$lib/day';

  const unitKerja = getContext('unitKerja');
  export let aggregation = [];
</script>

<div>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Tanggal</th>
        <th>08:00 - 16:00</th>
        <th>20:00 - 04:00</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each aggregation as row}
        <tr>
          <td>{day(row.d).format('dddd')}</td>
          <td>{day(row.d).format('YYYY-MM-DD')}</td>
          <td>{row.shift_1}</td>
          <td>{row.shift_2}</td>
          <td>
            <a
              href={`/app/unit-kerja/${unitKerja.id}/jadwal/${day(row.d).format('YYYY-MM-DD')}`}
            >detail</a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
