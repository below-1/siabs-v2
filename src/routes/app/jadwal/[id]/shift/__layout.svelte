<script>
  import { getContext } from 'svelte';
  import { client_fetch_json } from '$lib/http';
  import PageHeader from '$lib/page-header.svelte';
  import Submenus from '$lib/submenus.svelte';
  import FButton from '$lib/fbutton.svelte';
  import ModalConfirmation from '$lib/modal-confirmation.svelte';
  import day from '$lib/day';

  const item = getContext('item');
  const cu = getContext('currentUser');
  const user = cu.getUser();

  const ds = day(item.jadwal.day_start);
  const de = day(item.jadwal.day_end);
  const format = {
    ds: ds.format('dddd, DD MMM, YYYY'),
    de: de.format('dddd, DD MMM, YYYY'),

    mobile: {
      ds: ds.format('DD-MM-YYYY'),
      de: de.format('DD-MM-YYYY')
    }
  };

  function formatDates(item, user) {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Makassar',
      dateStyle: 'full'
    });
    return {
      day_start: formatter.format(new Date(item.jadwal.day_start)),
      day_end: formatter.format(new Date(item.jadwal.day_end))
    };
  }

  const dates_formatted = formatDates(item, user);

  const menus = [
    { 
      path: `/app/jadwal/${item.jadwal.id}/shift/shifts`, 
      label: 'Shift' 
    },
    { 
      path: `/app/jadwal/${item.jadwal.id}/shift/absen`, 
      label: 'Absen' 
    },
    { 
      path: `/app/jadwal/${item.jadwal.id}/shift/edit`, 
      label: 'Edit' 
    }
  ];

  let deleteModal = false;
  const deleteMessage = `Data absen dan shift akan ikut terhapus`;

  function onDelete() {
    window.location = `/app/jadwal/${item.jadwal.id}/delete`
  }

</script>

<PageHeader>

  <div class="flex flex-col md:flex-row gap-y-4 md:items-center">

    <div class="flex-grow">
      <div class="text-sm text-gray-600">{item.jadwal.id}</div>

      <div class="hidden md:flex text-lg items-center gap-x-3 font-bold">
        <span>{format.ds}</span>
        <span>-</span>
        <span>{format.de}</span>
      </div>

      <div class="md:hidden text-lg flex items-center gap-x-3 font-bold">
        {format.mobile.ds} --- {format.mobile.de}
      </div>

      <div class="text-lg hidden md:flex items-center gap-x-3 font-bold">
        <span>{format.ts}</span>
        <span>-</span>
        <span>{format.te}</span>
      </div>

      <div class="md:hidden text-lg flex items-center gap-x-3 font-bold">
        {format.ts} --- {format.te}
      </div>
    </div>

    <a 
      href={`/app/unit-kerja/${item.unit_kerja.id}/overview`}
      class="flex md:items-center gap-x-4"
    >
      <img
        class="w-12 h-12 rounded"
        src={item.unit_kerja.avatar}
      />
      <div>
        <div class="text-lg font-bold">{item.unit_kerja.nama}</div>
        <div class="">
          <span class="text-sm py-0.5 px-3 rounded bg-gray-200 rounded">Kantor {item.unit_kerja.tipe}</span>
        </div>
      </div>
      <div class="flex-grow"></div>
    </a>

    <FButton 
      danger
      on:click={() => {
        deleteModal = true;
      }}
    >Hapus</FButton>

  </div>
</PageHeader>

<Submenus 
  menus={menus}
/>

<slot></slot>

<ModalConfirmation
  bind:show={deleteModal}
  message={deleteMessage}
  title="Hapus jadwal"
  onYes={onDelete}
/>
