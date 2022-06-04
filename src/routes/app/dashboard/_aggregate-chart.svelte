<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import day from '$lib/day';
  import { client_fetch_json } from '$lib/http';

  const random_url_api = `https://random-data-api.com/api/number/random_number?size=30`;

  let series = [];
  let Highcharts = null;
  const now = day();
  const n_data = now.endOf('month').date() + 1;

  async function getAggregateData() {
    const start = day().startOf('month').toISOString();
    const end = day().endOf('month').toISOString();
    try {
      const response = await client_fetch_json({
        path: '/app/dashboard/aggregate',
        method: 'GET',
        params: {
          start,
          end
        }
      });
      return response.items;   
    } catch (err) {
      console.log(err);
      alert('gagal mengambil data grafik');
      throw err;
    }
  }

  async function buildSeries() {
    const data = await getAggregateData();
    let _series = [
      {
        data: [],
        color: 'red',
      },
      {
        data: [],
        color: 'golden',
      },
      {
        data: [],
        color: 'green',
      }
    ];
    data.forEach(item => {
      _series[0].data.push(parseInt(item.alpa));
      _series[1].data.push(parseInt(item.in_time));
      _series[2].data.push(parseInt(item.late));
    });
    series = _series;
    console.log(series);
    console.log('series');
  }

  function generateCategories() {
    let d = day().startOf('month');
    const end = day().endOf('month');
    let result = [];
    while (d.isBefore(end)) {
      result.push(d.format('DD'));
      d = d.add(1, 'day');
    }
    return result;
  }

  function draw_chart() {
    const categories = generateCategories();
    const chart = Highcharts.chart('aggregate-chart', {
      chart: {
          type: 'column'
      },
      title: {
          text: null
      },
      legend: {
        enabled: false
      },
      xAxis: {
          categories,
          labels: {
            align: 'left',
            x: 6,
            style: {
              color: 'black',
              fontSize: '12px'
            }
          }
      },
      yAxis: {
          title: {
              text: 'Absen'
          }
      },
      series
    });
  }

  // n   ->   number of data generated
  async function randomData(n) {
    const url = new URL(random_url_api);
    url.searchParams.append('size', n);
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    console.log('data');
    return {
      data: data.map(it => it.decimal)
    }
  }

  // n  ->  Number of series generated
  async function randomSeries(n_series, n_data) {
    const promises = Array(n_series)
      .fill(0)
      .map((_, i) => randomData(n_data));
    return Promise.all(promises);
  }

  onMount(async () => {
    if (browser) {
      Highcharts = await import('highcharts');
      await buildSeries();
      draw_chart();
    }
  })
</script>

<div id="aggregate-chart" style="width:100%; height:400px;"></div>