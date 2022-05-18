<script>
  import LandingNav from '$lib/LandingNav.svelte';

  const catchphrases = ['staf', 'jadwal', 'tugas']

  const menus = [
    { label: 'login', path: '/auth/signin' },
    { label: 'tentang kami', path: '/about' }
  ]
</script>

<div class="h-screen w-screen bg-gray-50 flex flex-col">

  <nav class="border-b border-gray-200">
    <div class="h-12 container flex items-center gap-x-2">
      <div class="h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"></div>
      <p style="font-family: 'Bungee';" class="font-black text-gray-700 text-lg">SIABS</p>
      <div class="grow"></div>
      <div class="self-stretch flex">
        {#each menus as menu}
          <a 
            class="text-sm flex items-center px-4 hover:bg-gray-100 font-semibold text-gray-500" 
            href={menu.path}
          >{menu.label}</a>
        {/each}
      </div>
    </div>
  </nav>

  <div class="container self-stretch grid grid-cols-1">
    <div class="self-center justify-self-center">
      <slot></slot>
    </div>
  </div>

  <footer class="border-t">
    <div class="h-12 container flex items-center gap-x-2">
      <p class="flex-grow text-sm text-center font-bold text-gray-400">proudly presented by jordan meta</p>
    </div>
  </footer>
</div>
