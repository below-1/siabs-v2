import db from '../../../db';

export async function get(event) {
  const { pegawai } = event.locals.session;
  return {
    body: {
      pegawai
    }
  }
}