<script>
  import { getContext } from 'svelte'
  import day from '$lib/day'

  const item = getContext('item')
  console.log(item);
  console.log('item');

  const alert_masuk = day(item.absen.alert_masuk)
  const absen_masuk = day(item.absen.absen_masuk)
  const status_masuk = item.absen.status_masuk ? item.absen.status_masuk : ''

  const alert_keluar = day(item.absen.alert_keluar)
  const absen_keluar = day(item.absen.absen_keluar)
  const status_keluar = item.absen.status_keluar ? item.absen.status_keluar : ''

  const format = {
    alert_masuk: alert_masuk.format('DD MMMM YYYY HH:mm'),
    absen_masuk: absen_masuk ? absen_masuk.format('DD MMMM YYYY HH:mm') : null,
    status_masuk: status_masuk,

    alert_keluar: alert_keluar.format('DD MMMM YYYY HH:mm'),
    absen_keluar: absen_keluar ? absen_keluar.format('DD MMMM YYYY HH:mm') : null,
    status_keluar: status_keluar,
  }
</script>

<div class="container px-4">
  <div class="flex flex-col gap-y-4">
    <div class="hidden md:flex border-b-2 py-4 items-center">
      <div class="w-1/3 font-bold text-2xl">Pegawai</div>
      <div class="w-1/3 font-bold text-2xl">Masuk</div>
      <div class="w-1/3 font-bold text-2xl">Keluar</div>
    </div>
  </div>

  <div class="flex flex-wrap md:flex-nowrap gap-y-8 gap-x-4 py-4">

    <div class="w-full md:w-1/3 flex flex-col gap-y-4">
      <div class="flex gap-x-2 p-2 bg-gray-50 border">
        <img 
          src={item.pegawai.avatar}
          class="rounded border w-12 h-12" 
          alt="gambar"
        />
        <div>
          <a
            href={`/app/pegawai/${item.pegawai.nik}/overview`} 
            class="text-xl font-bold link"
          >{item.pegawai.nama}</a>
          <div class="font-bold text-gray-600">{item.pegawai.nip}</div>
        </div>
      </div>
      <div class="flex gap-x-2 p-2 bg-gray-50 border">
        <img 
          src={item.unit_kerja.avatar}
          class="rounded border w-12 h-12" 
          alt="gambar"
        />
        <div>
          <a
            href={`/app/unit-kerja/${item.unit_kerja.id}/jadwal`} 
            class="text-xl font-bold link"
          >{item.unit_kerja.nama}</a>
          <p class="font-bold text-gray-600">{item.unit_kerja.alamat.substr(0, 20) + '...'}</p>
        </div>
      </div>

      <div class="bg-gray-50 border p-2">
        <h2 class="text-2xl font-semibold text-gray-700 tracking-widest text-center">{item.absen.tipe.toUpperCase()}</h2>
      </div>
    </div>

    <div class="flex flex-col w-full md:w-1/3 gap-x-2 gap-y-4 p-2 bg-gray-50 border">

      <h1 class="text-xl font-semibold">Check In</h1>
      <div>
        <div class="text-sm">Jadwal Check In</div>
        <div class="font-bold text-xl">{format.alert_masuk}</div>
      </div>

      <div>
        <div class="text-sm mb-2">Waktu Check In</div>
        {#if item.absen.absen_masuk}
          <div class="font-bold text-xl">{format.absen_masuk}</div>
        {:else}
          <div class="flex items-center justify-center p-2 rounded font-bold bg-gray-200 text-gray-600">
            belum check in
          </div>
        {/if}
      </div>

      {#if item.absen.status_masuk}
        <div>
          <div class="text-sm mb-2"> Status Check In </div>
          <div class="font-bold text-xl"> {item.absen.status_masuk} </div>
        </div>
      {/if}

    </div>

    <div class="flex flex-col w-full md:w-1/3 gap-x-2 gap-y-4 p-2 bg-gray-50 border">
      <h1 class="text-xl font-semibold">Check Out</h1>
      <div>
        <div class="text-sm">Jadwal Check Out</div>
        <div class="font-bold text-xl">{format.alert_keluar}</div>
      </div>

      <div>
        <div class="text-sm mb-2">Waktu Check Out</div>
        {#if item.absen.absen_keluar}
          <div class="font-bold text-xl">{format.absen_keluar}</div>
        {:else}
          <div class="flex items-center justify-center p-2 rounded font-bold bg-gray-200 text-gray-600">
            belum check out
          </div>
        {/if}
      </div>
      {#if item.absen.status_keluar}
        <div>
          <div class="text-sm mb-2"> Status Check Out </div>
          <div class="font-bold text-xl"> {item.absen.status_keluar} </div>
        </div>
      {/if}
    </div>

  </div>
</div>