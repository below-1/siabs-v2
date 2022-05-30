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

<nav class="fixed top-0 left-0 right-0 flex flex-col h-14 bg-white" style="z-index: 11;">
  <div class="container mx-auto flex items-center gap-x-4 flex-grow">
    <a 
      href='/'
      class="flex items-center gap-x-2">
      <img src='/logo.svg' class="h-10 w-10" />
      <div>
        <div class="text-sm">Dinas Perhubungan Kupang</div>
        <div class="text-xs">SIABS Management</div>
      </div>
    </a>

    <div class="flex items-center flex-grow">
      {#each menus as menu}
        <a href={menu.path} class="px-4 py-2">
          {menu.label}
        </a>
      {/each}
    </div>

    <button class="flex items-center mr-2">
      <div class="h-8 w-8 rounded bg-gray-900 flex items-center justify-center">
        <Icon icon="mdi-light:bell" class="h-6 w-6" />
      </div>
    </button>

    <button on:click={toggleAccountMenu} type="button" class="flex items-center mr-2">
      <img 
        src={accountAvatar}
        alt="logo" 
        class="w-8 h-8 rounded"
      />
    </button>

    <button 
      class="flex items-center md:hidden" 
      on:click={toggleSideMenu}
    >
      <div class="h-8 w-8 rounded bg-gray-900 flex items-center justify-center">
        <Icon icon="mdi-menu" class="h-6 w-8" />
      </div>
    </button>
  </div>
  <div class="bg-gradient-to-r from-purple-800 to-blue-500 h-1"></div>
</nav>