<script>
  import LandingNav from '$lib/LandingNav.svelte';
  import LogoLink from '$lib/logo.svelte';

  const catchphrases = ['staf', 'jadwal', 'tugas']

  const menus = [
    { label: 'login', path: '/auth/signin' },
    { label: 'tentang kami', path: '/about' }
  ]
</script>

<nav class="navbar is-light is-fixed-top">
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

<section class="hero is-fullheight-with-navbar">
  <div class="hero-body is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <slot></slot>
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

