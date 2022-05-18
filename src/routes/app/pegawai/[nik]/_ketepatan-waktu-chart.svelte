<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/env'

  let Highcharts = null;

  function draw_chart() {
    const chart = Highcharts.chart('ketepatan-waktu-chart', {
      chart: {
          type: 'bar'
      },
      title: {
          text: null
      },
      legend: {
        enabled: false
      },
      xAxis: {
          categories: ['0-5 menit', '5-20 menit', '> 20 menit'],
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
      series: [{
          data: [12, 35, 4]
      }]
    });
  }

  onMount(async () => {
    if (browser) {
      Highcharts = await import('highcharts');
      draw_chart();
    }
  })
</script>

<div id="ketepatan-waktu-chart" style="width:100%; height:200px;"></div>