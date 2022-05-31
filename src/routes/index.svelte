<script context="module">
  export const prerender = true;
</script>

<script>
  import LandingNav from '$lib/LandingNav.svelte';

  const catchphrases = ['staf', 'jadwal', 'tugas']

  const menus = [
    { label: 'login', path: '/auth/signin' },
    { label: 'tentang kami', path: '/about' }
  ]
</script>

<style>
  .catchphrase {
    background: linear-gradient(to right, red, blue);
    /*text-shadow: 0px 0px white;*/
    background-clip: text;
    -webkit-text-fill-color:  rgba(0, 0, 0, 1);
    animation-iteration-count: infinite;
    animation-duration: 9s;
    /*animation-direction: alternate;*/
    animation-timing-function: ease-in-out;
  }

  .catchphrase._1 {
    animation-name:  canim_1;
    /*animation-direction: alternate;*/
  }
  .catchphrase._2 {
    animation-name:  canim_2;
    /*animation-direction: alternate;*/
  }
  .catchphrase._3 {
    animation-name:  canim_3;
    /*animation-direction: alternate;*/
  }

  @keyframes canim_1 {
    0% {
      -webkit-text-fill-color: rgba(0, 0, 0, 1);
    }
    10% {
      -webkit-text-fill-color: rgba(0, 0, 0, 0);
    }
    40% {
      -webkit-text-fill-color: rgba(0, 0, 0, 1);
    }
  }

  @keyframes canim_2 {
    25% {
      -webkit-text-fill-color: rgba(0, 0, 0, 1);
    }
    50% {
      -webkit-text-fill-color: rgba(0, 0, 0, 0);
    }
  }

  @keyframes canim_3 {
    65% {
      -webkit-text-fill-color: rgba(0, 0, 0, 1);
    }
    90% {
      -webkit-text-fill-color: rgba(0, 0, 0, 0);
    }
    100% {
      -webkit-text-fill-color: rgba(0, 0, 0, 1);
    }
  }
</style>

<svelte:head>
  <title>SIABS -- Home</title>
</svelte:head>

<div>

  <nav class="navbar is-light is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item is-flex">
          <img src="/logo.svg" style="max-height: 2.5rem;" class="mr-2">
          <div class="is-flex is-flex-direction-column">
            <span style="line-height: 100%;" class="has-text-weight-bold">Dinas Perhubungan NTT</span>
            <small>Absensi Online</small>
          </div>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" href="/auth/signin">signin</a>
          <a class="navbar-item" href="/about">about us</a>
        </div>
      </div>
    </div>
  </nav>

  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
      {#each catchphrases as cp, i}
        <h1
          style="font-family: 'Bungee'; font-size: 5rem;" 
          class={`catchphrase _${i + 1} has-text-weight-bold`}
        >{cp}</h1>
      {/each}
      <h2 class="is-size-5">Sistem Informasi Absensi Online</h2>
    </div>
  </section>

  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
        is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
      </p>
    </div>
  </footer>
</div>
