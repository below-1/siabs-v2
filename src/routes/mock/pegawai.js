import { 
  randProduct, 
  randAlphaNumeric, 
  randFullName, 
  randSentence,
  randBetweenDate,
  randUserName,
  rand
} from '@ngneat/falso';
import fs from 'fs';
import CsvReadableStream from 'csv-reader';

function loadCsvFile(path) {
  const inputStream = fs.createReadStream(path, {
    encoding: 'utf8'
  });
  return new Promise((resolve, reject) => {
    let rows = [];
    inputStream
      .pipe(new CsvReadableStream({
        parserNumbers: true,
        trim: true
      }))
      .on('data', function (row) {
        rows.push(row);
      })
      .on('error', function (err) {
        console.log(err);
        reject(err);
      })
      .on('end', function () {
        resolve(rows);
      })
  })
}

export async function initialize_pegawai({ sql }) {
  const items = await loadCsvFile('pegawai.csv');
  const jenis_kelamin_options = ['Laki - Laki', 'Perempuan']
  const t0 = new Date('1990-01-01')
  const t1 = new Date('2001-01-01')
  let payloads = []
  let user_payloads = []
  const n = items.length;
  let allNiks = new Set();
  for (let i = 0; i < n; i++) {
    const nid = i + 1;
    const nama = items[i][0]

    let nik = (items[i][1] && items[i][1].length) > 10
      ? items[i][1]
      : randAlphaNumeric({ length: 10 }).join('');

    // nik = nik
    //   .replaceAll(' ', '')
    //   .replace("'", '');

    if (allNiks.has(nik)) {
      console.log(`nik=${nik}`);
      throw new Error(nik)
    }
    allNiks.add(nik)

    const nip = nik;
    const jenis_kelamin = rand(jenis_kelamin_options)
    const tanggal_lahir = randBetweenDate({ 
      from: t0,
      to: t1
    })
    const alamat = randSentence()
    const username = nik
    const password = nik

    payloads.push({
      nama,
      nip,
      nik,
      tanggal_lahir,
      jenis_kelamin,
      username
    })
    user_payloads.push({
      username,
      password,
      timezone: '+08:00'
    })
  }
  console.log(user_payloads)
  const user_list = await sql`
    insert into "user" ${sql(user_payloads)}
    returning *
  `
  const pegawai_list = await sql`
    insert into pegawai ${sql(payloads)}
    returning *
  `
  return pegawai_list
}