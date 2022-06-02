<script>
  import { session, page } from '$app/stores';
  import Icon from '@iconify/svelte';

  export let toggleAccountMenu;
  export let toggleSideMenu;
  export let accountAvatar;

  $: menus = _menus($session, $page);

  function _menus(sess, page) {
    const current_path_pattern = '/' + page.routeId
    let result = []
    if (sess.user.super_user) {
      result = [
        { path: '/app/dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard' },
        { path: '/app/unit-kerja', label: 'Unit Kerja', icon: 'mdi:office-building-cog' },
        { path: '/app/pegawai', label: 'Pegawai', icon: 'raphael:employee' },
        { path: '/app/jadwal', label: 'Jadwal', icon: 'clarity:calendar-solid' },
        { path: '/app/account', label: 'Akun', icon: 'mdi:account-cog' }
      ]
    } else if (sess.user.uk_admin) {
      result = [
        { path: '/app/unit-kerja', label: 'unit kerja' },
        { path: '/app/pegawai', label: 'pegawai' },
        { path: '/app/jadwal', label: 'jadwal' },
        { path: '/app/account', label: 'Akun', icon: 'mdi:account-cog' }
      ]
    } else {
      const pegawai = $session.pegawai;
      result = [
        { path: `/app/pegawai/${pegawai.nik}/overview`, label: 'Dashboard' },
        { path: '/app/account', label: 'Akun', icon: 'mdi:account-cog' }
      ]
    }

    result = result.map(r => {
      if (current_path_pattern.startsWith(r.path)) {
        return {
          ...r,
          active: true
        }
      }
      return r
    })

    return result;
  }
</script>

<nav class="navbar is-black" style="z-index: 11;">
  <div class="container">
    <div class="navbar-brand">
      <a href="/" class="navbar-item is-flex">
        <img src="/logo.svg" class="mr-2">
        <div class="is-flex is-flex-direction-column">
          <span style="line-height: 100%;" class="has-text-weight-bold">Dinas Perhubungan NTT</span>
          <small>Absensi Online</small>
        </div>
      </a>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div 
      class="navbar-menu"
    >
      <div class="navbar-start">
        {#each menus as menu}
          <a href={menu.path} class="navbar-item">
            {menu.label}
          </a>
        {/each}
      </div>

      <div class="navbar-end">
        <a href="#" class="navbar-item">
          <span class="icon is-large">
            <Icon icon="mdi-light:bell" width="1.4rem" height="1.4rem" />
          </span>
        </a>
        <a href="#" class="navbar-item">
          <figure class="image" on:click={toggleAccountMenu} >
            <img
              src={accountAvatar}
              alt="logo" 
              class="is-rounded"
            />
          </figure>
        </a>
      </div>
    </div>

  </div>
  <div class="bg-gradient-to-r from-purple-800 to-blue-500 h-1"></div>
</nav>