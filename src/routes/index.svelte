<script context="module">
  export const prerender = true;
</script>

<script>
  import LogoLink from '$lib/logo.svelte';

  const catchphrases = ['staf', 'jadwal', 'tugas']

  const menus = [
    { label: 'login', path: '/auth/signin' },
    { label: 'tentang kami', path: '/about' }
  ]
</script>

<style>
  .layered {
    background-image: 
      linear-gradient(to right, rgba(250, 250, 250, 0.5), rgba(250, 250, 250, 0.9), rgba(250, 250, 250, 0.5)),
      url(/bg.jpg);
    background-size: cover;
  }
  .catchphrase {
    /*background: linear-gradient(to right, red, blue);
    background-clip: text;
    -webkit-text-fill-color:  rgba(0, 0, 0, 1);
    animation-iteration-count: infinite;
    animation-duration: 9s;
    animation-direction: alternate;
    animation-timing-function: ease-in-out; */
    line-height: 100%;
  }

  .catchphrase._1 {
    /* animation-name:  canim_1; */
    /*animation-direction: alternate;*/
  }
  .catchphrase._2 {
    /* animation-name:  canim_2; */
    /*animation-direction: alternate;*/
  }
  .catchphrase._3 {
    /* animation-name:  canim_3; */
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
  <title>Sipeking -- Home</title>
</svelte:head>

<div>

  <section class="hero is-fullheight">
    <div class="hero-head">
      <nav class="navbar is-light">
        <div class="container">
          <div class="navbar-brand">
            <LogoLink />
          </div>

          <div class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item" href="/auth/signin">signin</a>
              <a class="navbar-item" href="/about">about us</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="hero-body is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered layered">
      <h1
        style="font-family: 'Bungee'; font-size: 5rem;" 
        class="catchphrase  has-text-weight-bold"
      >SIPEKING</h1>
      <h2 class="is-size-5">Sistem Informasi Pengawasan Kinerja Pegawai</h2>
      <a href="/auth/signin" class="button button is-info is-large mt-4">
        login
      </a>
    </div>
    <div class="hero-foot">
      <div class="content has-text-centered has-background-light p-5">
        <p style="color: #888;">
          <strong>Sipeking</strong> by <a href="https://jgthms.com">Jordan Meta</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </div>
  </section>
</div>
