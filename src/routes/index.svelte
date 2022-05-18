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

<div class="h-screen w-screen bg-gray-50 flex flex-col">

  <nav class="border-b border-gray-200 px-4">
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
    <div class="self-center justify-self-center text-center">

      {#each catchphrases as cp, i}
        <h1 
          style="font-family: 'Bungee';" 
          class={`catchphrase _${i + 1} font-black leading-tight text-5xl md:text-8xl`}
        >{cp}.</h1>
      {/each}
      <h2 class="text-xl md:text-3xl font-black text-gray-700 leading-relaxed">Sistem Informasi Absensi Online</h2>
    </div>
  </div>

  <footer class="border-t">
    <div class="h-12 container flex items-center gap-x-2">
      <p class="flex-grow text-sm text-center font-bold text-gray-400">proudly presented by jordan meta</p>
    </div>
  </footer>
</div>
