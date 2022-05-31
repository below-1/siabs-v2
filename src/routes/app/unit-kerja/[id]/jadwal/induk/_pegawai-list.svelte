<script>
  export let items = [];
</script>

<div>
  {#each items as item}
    <a 
      href={`/app/pegawai/${item.nik}/overview`}
      class="media"
    >
      <figure class="media-left">
        <p class="image is-48x48">
          <img
            src={item.avatar}
          />
        </p>
      </figure>
      <div class="media-content">
        <div class="content hast-text-black" style="color: black;">
          <div>{item.nama}</div>
          <div class="is-size-7">
            <span>{item.nip}</span>
            <span>{item.nik}</span>
          </div>
        </div>
      </div>
    </a>
  {/each}
</div>
