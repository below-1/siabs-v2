<script>
  import { getContext } from 'svelte'
  import day from '$lib/day';
  import Icon from '@iconify/svelte';
  import StatusBox from './_status-box.svelte';

  const item = getContext('item');
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

<div class="columns">

  <div class="column is-4">
    <div class="title">Info</div>
    <a class="media" href={`/app/pegawai/${item.pegawai.nik}/overview`}>
      <figure class="media-left">
        <p class="image is-64x64">
          <img
            src={item.pegawai.avatar}
          />
        </p>
      </figure>
      <div class="media-content">
        <div class="content hast-text-black" style="color: black;">
          <div class="is-size-4">{item.pegawai.nama}</div>
          <div class="is-size-6">
            <span>{item.pegawai.nik}</span>
            <span>{item.pegawai.nip}</span>
          </div>
        </div>
      </div>
    </a>
    {#if item.absen.tipe != 'dl'}
    <a class="media" href={`/app/unit-kerja/${item.unit_kerja.id}/edit-data`}>
      <figure class="media-left">
        <p class="image is-64x64">
          <img
            src={item.unit_kerja.avatar}
          />
        </p>
      </figure>
      <div class="media-content">
        <div class="content hast-text-black" style="color: black;">
          <div class="is-size-4">{item.unit_kerja.nama}</div>
          <div class="is-size-7">
            <span>Kantor {item.unit_kerja.tipe}, </span>
            <span>{item.unit_kerja.alamat}</span>
          </div>
        </div>
      </div>
    </a>
    {/if}
  </div>

  <div class="column is-4">
    <div class="title">Check In</div>
    <article class="media">
      <figure class="media-left">
        <Icon icon="mdi:clock-time-eleven-outline" class="image is-64x64" />
      </figure>
      <div class="media-content">
        <div class="content hast-text-black" style="color: black;">
          <div class="is-size-5">{format.alert_masuk}</div>
          <div class="text-sm">Jadwal Check In</div>
        </div>
      </div>
    </article>
    <article class="media">
      <figure class="media-left">
        <Icon icon="mdi:information" class="image is-64x64" />
      </figure>
      <div class="media-content">
        <div class="content hast-text-black" style="color: black;">
          {#if item.absen.absen_masuk}
            <div class="is-size-5">{format.absen_masuk}</div>
          {:else}
            <div class="is-size-5">Belum Check In</div>
          {/if}
          <div class="text-sm">Waktu Check In</div>
        </div>
      </div>
    </article>
    <StatusBox
      status={item.absen.status_masuk}
      label="Status Check In"
    >
    </StatusBox>
  </div>

  <div class="column is-4">
    <div class="title">Check Out</div>
    <article class="media">
      <figure class="media-left">
        <Icon icon="mdi:clock-time-eleven-outline" class="image is-64x64" />
      </figure>
      <div class="media-content">
        <div class="content hast-text-black" style="color: black;">
          <div class="is-size-5">{format.alert_keluar}</div>
          <div class="text-sm">Jadwal Check Out</div>
        </div>
      </div>
    </article>
    <article class="media mb-4">
      <figure class="media-left">
        <Icon icon="mdi:information" class="image is-64x64" />
      </figure>
      <div class="media-content">
        <div class="content hast-text-black" style="color: black;">
          {#if item.absen.absen_keluar}
            <div class="is-size-5">{format.absen_keluar}</div>
          {:else}
            <div class="is-size-5">Belum Check Out</div>
          {/if}
          <div class="text-sm">Waktu Check Out</div>
        </div>
      </div>
    </article>
    <StatusBox
      status={item.absen.status_keluar}
      label="Status Check Out"
    >
    </StatusBox>
  </div>
</div>