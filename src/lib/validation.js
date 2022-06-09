import { isEmpty } from './util'

export function required(msg) {
  return (v) => {
    if (v === null || v === undefined || v === '') {
      return msg
    }
  }
}

export function min_length(n, msg) {
  return (v) => {
    if (!v) return;
    if (v.length < n) {
      return msg
    }
  }
}

export function max_length(n, msg) {
  return (v) => {
    if (!v) return;
    if (v.length > n) {
      return msg
    }
  }
}

export function useValidation(rules, obj) {
  let result = {}
  for (let k of Object.keys(rules)) {
    const field_rules = rules[k]
    for (let r of field_rules) {
      const vr = r(obj[k])
      if (vr) {
        result[k] = vr
        break
      }
    }
  }
  return {
    fields: result,
    valid: isEmpty(result)
  }
}

export function watchError(rules) {
  return (value) => {
    for (let r of rules) {
      const vr = r(value)
      if (vr) {
        return vr;
      }
    }
    return null;
  }
}

export function combineErrors(...vals) {
  return vals.find(v => !!v);
}
