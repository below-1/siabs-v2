<script>
  import { getContext } from 'svelte'

  const item = getContext('item')
</script>

<div class="container px-4">
  <div class="flex flex-col gap-y-4">
    <div class="hidden md:flex border-b-2 py-4 items-center">
      <div class="w-1/3 font-bold text-2xl">Pegawai</div>
      <div class="w-1/3 font-bold text-2xl">Jadwal</div>
      <div class="w-1/3 font-bold text-2xl">Absen</div>
    </div>
  </div>

  <div class="flex flex-wrap gap-y-8 py-4">

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

    <div class="w-full md:w-1/3 flex flex-col gap-y-4">
      <div>
        <div class="text-sm">Hari Tanggal</div>
        <div class="font-bold text-xl">23 Maret 2022</div>
      </div>

      <div>
        <div class="text-sm">Waktu</div>
        <div class="font-bold text-xl">Pukul 22:00 WIB</div>
      </div>

      <div>
        <div class="text-sm">Tipe Jadwal</div>
        <div class="font-bold text-xl">Jadwal {item.absen.tipe}</div>
      </div>

      <div>
        <div class="text-sm">ID Jadwal</div>
        <a href={`/app/jadwal/${item.jadwal.id}/pegawai`} class="font-bold text-xl link">#{item.jadwal.id}</a>
      </div>
    </div>

  </div>
</div>