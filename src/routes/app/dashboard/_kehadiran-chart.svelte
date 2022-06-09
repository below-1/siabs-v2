<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/env'

  let Highcharts = null;
  export let hadir = 0;
  export let alpa = 0;

  function draw_chart() {
    const chart = Highcharts.chart('kehadiran-chart', {
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
          categories: ['Hadir', 'Alpa'],
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
          data: [hadir, alpa]
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

<div id="kehadiran-chart" style="width:100%; height:150px;"></div>