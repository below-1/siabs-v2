<script>
  import { setContext } from 'svelte'
  import Icon from '@iconify/svelte';
  import { session, page } from '$app/stores'
  import Backdrop from '$lib/backdrop.svelte'

  $: user = $session.user;
  setContext('currentUser', {
    getUser: () => user
  });

  let showAccountMenu = false;
  let showMobileMenu = false;
  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
  }
  function toggleAccountMenu() {
    showAccountMenu = !showAccountMenu;
  }

  let showSideMenu = false;
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
        { path: '/app/dashboard', label: 'dashboard', icon: 'mdi:view-dashboard' },
        { path: '/app/unit-kerja', label: 'unit kerja', icon: 'mdi:office-building-cog' },
        { path: '/app/pegawai', label: 'pegawai', icon: 'raphael:employee' },
        { path: '/app/jadwal', label: 'jadwal', icon: 'clarity:calendar-solid' },
        { path: '/app/tugas', label: 'tugas', icon: 'bx:task' }
      ]
    } else if (sess.user.uk_admin) {
      result = [
        { path: '/app/unit-kerja', label: 'unit kerja' },
        { path: '/app/pegawai', label: 'pegawai' },
        { path: '/app/jadwal', label: 'jadwal' },
        { path: '/app/tugas', label: 'tugas' }
      ]
    } else {
      result = [
        { path: '/app/jadwal', label: 'jadwal' },
        { path: '/app/tugas', label: 'tugas' }
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

  $: menus = _menus($session, $page)
</script>

<div class="flex flex-col" style="min-height: 100vh;">

  <nav class="border-b-4 border-purple-900 bg-black text-white">
    <div class="container flex px-4 md:px-none">

      <a 
        href={`/app/tenant/${$session.tenant.id}`}
        class="flex items-center py-3 gap-x-2 mr-8 flex-grow md:flex-grow-0">
        <img src={$session.tenant.avatar} class="w-10 h-10 rounded" />
        <div>
          <div class="font-bold text-lg" style="line-height: 100%;">{$session.tenant.name}</div>
          <div class="text-xs">SIABS Management</div>
        </div>
      </a>

      <div class="hidden md:flex flex-grow items-center gap-x-8">
        {#each menus as menu}
          <a href={menu.path}>
            {menu.label}
          </a>
        {/each}
      </div>

      <button class="flex items-center mr-2">
        <div class="h-10 w-10 rounded bg-gray-900 flex items-center justify-center">
          <Icon icon="mdi-light:bell" width="2rem" height="2rem" />
        </div>
      </button>
      <button on:click={toggleAccountMenu} type="button" class="flex items-center mr-2">
        <img 
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" 
          alt="logo" 
          class="w-10 h-10 rounded"
        />
      </button>

      <button 
        class="flex items-center" 
        on:click={toggleSideMenu}
      >
        <div class="h-10 w-10 rounded bg-gray-900 flex items-center justify-center">
          <Icon icon="mdi-menu" width="2rem" height="2rem" />
        </div>
      </button>
    </div>
  </nav>

  {#if user.superUser}
  <nav class="border-b border-gray-200 bg-gray-50">
    <div class="container flex overflow-x-scroll md:overflow-hidden">
      {#each menus as menu, i}
        <a
          href={menu.path}
          class="py-3 px-4 hover:bg-gray-50 border-black whitespace-nowrap"
          class:text-black={menu.active}
          class:font-black={menu.active}
          class:border-b-2={menu.active}
        >
          {menu.label}
        </a>
      {/each}
    </div>
  </nav>
  {/if}

  <div class="flex-grow pb-12">
    <slot></slot>
  </div>

  <footer class="border-t border-gray-200 flex justify-center items-center h-12 bg-gray-900">
    <div class="text-sm font-bold text-gray-200">Copyright Jordan Meta</div>
  </footer>
</div>

<Backdrop bind:show={showAccountMenu}>
  <div class="bg-white shadow-xl border rounded">
    <div class="flex flex-col">
      <div class="flex items-center gap-x-4 border-b p-4">
        <img 
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" 
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
</Backdrop>

{#if showSideMenu}
<div 
  style="position: fixed; top: calc(4rem + 4px); bottom: 0; right:  0; left: 0; background: rgba(250, 250, 250, 0.5);"
  on:click|self={hideSideMenu}
>
  <div class="mr-auto w-4/5 h-full shadow-xl bg-gray-50 flex flex-col px-4 py-6 gap-y-4">

    {#each menus as menu, i}
      <a 
        href={menu.path}
        on:click={hideSideMenu}
        class="flex items-center gap-x-6"
      >
        <div class="p-2 rounded bg-gray-200 rounded flex items-center justify-center">
          <Icon icon={menu.icon} width="1.5rem" height="1.5rem" />
        </div> 
        <span class="text-xl">{menu.label}</span>
      </a>
    {/each}

  </div>
</div>
{/if}