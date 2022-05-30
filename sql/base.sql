drop database if exists absensi_db cascade;
create database absensi_db;

use absensi_db;

create table "user" (
  username STRING PRIMARY KEY NOT NULL,
  password STRING,
  super_user BOOL NOT NULL DEFAULT FALSE,
  "timezone" STRING NOT NULL
);

create type jenis_kelamin_type as enum('Laki - Laki', 'Perempuan');
create table pegawai (
  nik STRING NOT NULL UNIQUE,
  nama STRING NOT NULL,
  nip STRING,
  jenis_kelamin jenis_kelamin_type NOT NULL,
  avatar STRING,
  tanggal_lahir TIMESTAMPTZ NOT NULL,
  username STRING NOT NULL REFERENCES public.user(username) ON DELETE CASCADE,
  whatsapp STRING,
  PRIMARY KEY (nik, nip, nama)
);

create type tipe_unit_kerja as enum('induk', 'satpel');
create table unit_kerja (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama STRING NOT NULL,
  alamat STRING NOT NULL,
  latitude STRING,
  longitude STRING,
  avatar STRING,
  tipe tipe_unit_kerja
);

create type work_type as enum('wfh', 'wfo', 'dl');
create type absen_status_type as enum('in-time', 'late', 'alpa');

create table absen (
  id UUID not null primary key default gen_random_uuid(),

  alert_masuk TIMESTAMPTZ NOT NULL,
  absen_masuk TIMESTAMPTZ,
  status_masuk absen_status_type,
  lat_masuk string,
  lng_masuk string,

  alert_keluar TIMESTAMPTZ NOT NULL,
  absen_keluar TIMESTAMPTZ,
  status_keluar absen_status_type,
  lat_keluar string,
  lng_keluar string,

  -- DL Location
  dl_lat string,
  dl_longitude string, 

  tipe work_type not null,

  -- 1: 08:00 - 16:00
  -- 2: 20:00 - 04:00
  -- 3: 00:00 - 23:59  DL, one day full
  kode_shift integer,

  id_unit_kerja UUID NOT NULL REFERENCES public.unit_kerja(id) ON DELETE CASCADE,
  nik STRING NOT NULL REFERENCES public.pegawai(nik) ON DELETE CASCADE
);

create index on absen (nik);
create index on absen (id_unit_kerja);
