use absensi_db;

create type jadwal_type as enum('one-shoot', 'fixed');
create type work_type as enum('wfh', 'wfo', 'dl');
create type jadwal_status_type as enum('waiting', 'in-progress', 'complete');
create type absen_status_type as enum('in-time', 'late', 'alpa');

create table jadwal (
  id UUID not null default gen_random_uuid(),
  tanggal date not null,

  waktu_masuk time not null,
  waktu_keluar time not null,

  absen_masuk time,
  status_masuk absen_status_type,
  lat_masuk string,
  lng_masuk string,

  absen_keluar time,
  status_keluar absen_status_type,
  lat_keluar string,
  lng_keluar string,

  jadwal_status jadwal_status_type default 'waiting',

  tipe work_type not null,

  id_tenant UUID NOT NULL REFERENCES public.tenant(id),
  id_unit_kerja UUID NOT NULL REFERENCES public.unit_kerja(id),
  nik STRING NOT NULL REFERENCES public.pegawai(nik),

  primary key (id, id_tenant)
);

