<script>
  import { setContext } from 'svelte'
  import { navigating } from '$app/stores'
  import Icon from '@iconify/svelte';
  import { session, page } from '$app/stores'
  import Backdrop from '$lib/backdrop.svelte';
  import TopNav from './_top-nav.svelte';

  $: user = $session.user;
  let showAccountMenu = false;
  let showMobileMenu = false;
  let showSideMenu = false;
  $: menus = _menus($session, $page);
  $: accountAvatar = getAccountAvatar($session);
  $: isSuperUser = user.super_user;

  setContext('currentUser', {
    getUser: () => user
  });

  function getAccountAvatar(session) {
    if (session.pegawai) {
      return session.pegawai.avatar;
    }
    return 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
  }

  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
  }
  function toggleAccountMenu() {
    showAccountMenu = !showAccountMenu;
  }

  function toggleSideMenu() {
    showSideMenu = !showSideMenu;
  }
  function hideSideMenu() {
    showSideMenu = false;
  }

  function isActive(path) {
    const current_path_pattern = '/' + $page.routeId
    if (current_path_pattern.startsWith('/app/unit-kerja')) {
      return true;
    } else if (current_path_pattern.startsWith('/app/pegawai')) {
      return true;
    } else if (current_path_pattern.startsWith('/app/jadwal')) {
      return true;
    } else if (current_path_pattern.startsWith('/app/tugas')) {
      return true;
    } else {
      return false;
    }
  }

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
      <a 
        role="button" 
        class="navbar-burger" 
        aria-label="menu" 
        aria-expanded="false"
        on:click={toggleMobileMenu}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div 
      class="navbar-menu"
      class:is-active={showMobileMenu}
    >
      <div class="navbar-start">
        {#each menus as menu}
          <a href={menu.path} class="navbar-item">
            {menu.label}
          </a>
        {/each}
      </div>

      <!-- Desktop Menu -->
      <div class="navbar-end is-hidden-mobile">
        {#if !user.super_user}
        <div class="navbar-item">
          <a class="button is-dark" href="/app/me">
            <Icon icon="mdi-light:bell" class="icon" />
            <span>Check Absen</span>
          </a>
        </div>
        {/if}
        <div class="navbar-item">
          <div 
            class="dropdown"
            class:is-active={showAccountMenu}
          >
            <div class="dropdown-trigger">
              <button 
                class="button is-dark"
                on:click={() => {
                  showAccountMenu = !showAccountMenu;
                }}
              >
                <Icon icon="mdi:account-settings" class="icon" />
                <span>{user.username}</span>
                <Icon icon="mdi:chevron-down" class="icon" />
              </button>
            </div>
            <div class="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Ganti Password
                </a>
                <a href="/auth/logout" class="dropdown-item">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="navbar-end is-hidden-tablet">
        <a class="navbar-item">
          <span>Pesan</span>
        </a>
        <a class="navbar-item">
          <span>Ganti Password</span>
        </a>
        <a class="navbar-item" href="/auth/logout">
          <span>Log Out</span>
        </a>
      </div>
    </div>

  </div>
  <div class="bg-gradient-to-r from-purple-800 to-blue-500 h-1"></div>
</nav>

<slot></slot>

<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
  </div>
</footer>

<!-- <Backdrop bind:show={showAccountMenu}>
  <div class="bg-white shadow-xl border rounded">
    <div class="flex flex-col">
      <div class="flex items-center gap-x-4 border-b p-4">
        <img 
          src={accountAvatar}
          alt="logo" 
          class="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <div class="font-black text-lg" style="line-height: 1;">{$session.user.username}</div>

          {#if $session.user.super_user}
          <div class="text-sm">Super Admin</div>
          {:else}
          <div class="text-sm text-gray-600">Pegawai</div>
          {/if}
        </div>
      </div>
      <a href="/account/change-password" class="flex items-center p-2 border-b">
        <span>Ganti Password</span>
      </a>
      <a href="/auth/logout" class="flex items-center p-2">
        <span>Logout</span>
      </a>
    </div>
  </div>
</Backdrop> -->

{#if showSideMenu}
<div 
  style="position: fixed; top: calc(3rem); bottom: 0; right:  0; left: 0; background: rgba(250, 250, 250, 0.5);"
  on:click|self={hideSideMenu}
>
  <div class="mr-auto w-4/5 h-full shadow-xl bg-gray-50 flex flex-col px-4 py-6 gap-y-4">

    {#each menus as menu, i}
      <a 
        href={menu.path}
        on:click={hideSideMenu}
        class="flex items-center gap-x-6"
      >
        <div class="p-1 rounded bg-gray-200 rounded flex items-center justify-center">
          <Icon icon={menu.icon} width="1.2rem" height="1.2rem" />
        </div> 
        <span>{menu.label}</span>
      </a>
    {/each}

  </div>
</div>
{/if}

<Backdrop show={$navigating}>
  <div class="h-16 w-16 rounded-full bg-gradient-to-r from-purple-800 to-blue-500 animate-pulse shadow-xl flex items-center justify-center">
    <svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
</Backdrop>