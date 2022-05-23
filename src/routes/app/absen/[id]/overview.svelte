<script>
  import { getContext } from 'svelte'
  import day from '$lib/day'

  const item = getContext('item')

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
    absen_masuk: absen_masuk ? absen_masuk.format('DD MMMM YYYY HH:mm') : null,
    status_masuk: status_masuk,
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

  <div class="flex gap-y-8 gap-x-4 py-4">

    <div class="w-full md:w-1/3 flex flex-col gap-y-4">
      <div class="flex items-center gap-x-4">
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
      <div class="flex items-center gap-x-4">
        <img 
          src={item.unit_kerja.avatar}
          class="rounded border w-12 h-12" 
          alt="gambar"
        />
        <div>
          <a 
            href={`/app/unit-kerja/${item.unit_kerja.id}/detail`} 
            class="text-xl font-bold link"
          >{item.unit_kerja.nama}</a>
          <div class="font-bold text-gray-600">{item.unit_kerja.alamat}</div>
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/3 flex flex-col gap-y-6">
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
    </div>

    <div class="w-full md:w-1/3 flex flex-col gap-y-6">
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
    </div>

  </div>
</div>