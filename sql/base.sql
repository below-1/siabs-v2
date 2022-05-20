drop database if exists absensi_db cascade;
create database absensi_db;

use absensi_db;

create table tenant (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name STRING NOT NULL,
  description STRING NOT NULL,
  avatar STRING NOT NULL
);

create table "user" (
  username STRING PRIMARY KEY NOT NULL,
  password STRING,
  super_user BOOL NOT NULL DEFAULT FALSE,
  uk_admin BOOL NOT NULL DEFAULT FALSE,
  "timezone" STRING NOT NULL,
  tenant_admin BOOL NOT NULL DEFAULT FALSE,
  id_tenant UUID NOT NULL REFERENCES public.tenant(id)
);

create type jenis_kelamin_type as enum('Laki - Laki', 'Perempuan');
create table pegawai (
  nik STRING NOT NULL UNIQUE,
  nama STRING NOT NULL,
  nip STRING,
  jenis_kelamin jenis_kelamin_type NOT NULL,
  avatar STRING,
  tanggal_lahir TIMESTAMPTZ NOT NULL,
  id_tenant UUID NOT NULL REFERENCES public.tenant(id),
  username STRING NOT NULL REFERENCES public.user(username),
  PRIMARY KEY (id_tenant, nik, nip, nama)
);

create type tipe_unit_kerja as enum('induk', 'satpel');
create table unit_kerja (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama STRING NOT NULL,
  alamat STRING NOT NULL,
  latitude STRING,
  longitude STRING,
  avatar STRING,
  tipe tipe_unit_kerja,
  id_tenant UUID NOT NULL REFERENCES public.tenant(id)
);

create type jadwal_type as enum('one-shoot', 'fixed');
create type work_type as enum('wfh', 'wfo', 'dl');
create type jadwal_status_type as enum('waiting', 'in-progress', 'complete');
create type absen_status_type as enum('in-time', 'late', 'alpa');

create table jadwal (
  id UUID not null primary key default gen_random_uuid(),
  group_id UUID not null,
  waktu_masuk TIMESTAMPTZ not null,
  waktu_keluar TIMESTAMPTZ not null,
  jadwal_status jadwal_status_type default 'waiting',
  id_tenant UUID NOT NULL REFERENCES public.tenant(id),
  id_unit_kerja UUID NOT NULL REFERENCES public.unit_kerja(id)
);

create table absen (
  absen_masuk TIMESTAMPTZ,
  status_masuk absen_status_type,
  lat_masuk string,
  lng_masuk string,
  absen_keluar TIMESTAMPTZ,
  status_keluar absen_status_type,
  lat_keluar string,
  lng_keluar string,
  tipe work_type not null,
  id_tenant UUID NOT NULL REFERENCES public.tenant(id),
  id_jadwal UUID NOT NULL REFERENCES public.jadwal(id),
  nik STRING NOT NULL REFERENCES public.pegawai(nik),
  primary key (nik, id_jadwal, id_tenant)
);