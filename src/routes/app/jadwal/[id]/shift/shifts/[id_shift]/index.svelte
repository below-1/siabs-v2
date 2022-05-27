<script>
  import { getContext } from 'svelte';
  import day from '$lib/day';
  import { client_fetch_json } from '$lib/http';
  import FField from '$lib/field.svelte';
  import FTime from '$lib/ftime.svelte';
  import FButton from '$lib/fbutton.svelte';

  export let id_shift = null;
  export let absenList = [];

  const item = getContext('item');
  const shift = item.shifts.find(shift => shift.id == id_shift);

  let waktu_masuk = shift.waktu_masuk.substr(0, 5);
  let waktu_keluar = shift.waktu_keluar.substr(0, 5);

  async function onSubmit () {
    const [ checkInHour, checkInMinute ] = waktu_masuk.substr(0, 5).split(':')
    const [ checkOutHour, checkOutMinute ] = waktu_keluar.substr(0, 5).split(':')

    absenList.map(absen => {
      const alert_masuk = day(absen.alert_masuk)
        .hour(parseInt(checkInHour))
        .minute(parseInt(checkInMinute))
        .toDate();
      let alert_keluar = day(absen.alert_keluar)
        .hour(parseInt(checkOutHour))
        .minute(parseInt(checkOutMinute));
      if (alert_keluar.isBefore(alert_masuk)) {
        alert_keluar = alert_keluar
          .add(1, 'day')
          .toDate()
      }
      return {
        id: absen.id,
        alert
      }
    })
    const payload = {
      waktu_masuk,
      waktu_keluar,
      absenList
    }

    try {
      const response = await client_fetch_json({
        method: 'POST',
        path: `/app/jadwal/${item.jadwal.id}/shift/shifts/${shift.id}`,
        payload
      })
    } catch (err) {
      console.log(err);
    }
  }
</script>

<div class="container md:px-4 py-6 text-gray-700">
  <h1 class="text-xl font-bold mb-6">Edit Data Shift</h1>
  <div
    class='flex flex-col md:w-1/2 gap-y-4'
  >
    <FField label="Check In">
      <FTime name="waktu_masuk" bind:value={waktu_masuk} />
    </FField>

    <FField label="Check Out">
      <FTime 
        name="waktu_keluar" 
        bind:value={waktu_keluar}
      />
    </FField>

    <FButton 
      primary
      on:click={onSubmit}
    >Simpan</FButton>
  </div>
</div>
