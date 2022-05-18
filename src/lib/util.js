import crypto from 'crypto'

export function isEmpty(obj) {
  for (let p in obj) {
    return false;
  }
  return true;
}

export function random_chars(n) {
  const chars = crypto.randomBytes(n).toString('hex');
  return chars.substring(0, n);
}
