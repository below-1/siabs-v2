<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/env'

  let chart_lib = null;

  export let id = '';
  export let label = '';
  export let data = [];
  export let colors = [];

  function draw_chart() {
    const ctx = id;
    const chart = new chart_lib.Chart(ctx, {
      type: 'doughnut',
      options: {
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        }
      },
      data: {
        label,
        datasets: [{
          label,
          data,
          backgroundColor: colors
        }]
      }
    })
  }

  onMount(async () => {
    if (browser) {
      chart_lib = await import('chart.js');
      chart_lib.Chart.register(...chart_lib.registerables);
      draw_chart();
    }
  })
</script>

<canvas id={id}></canvas>