export function status(s) {
  switch (s) {
    case 'WorkFromHome': return 'WFH';
    case 'WorkFromOffice': return 'WFO';
    case 'DinasLuar': return 'Dinas Luar';
    default: 
      return '';
  }
}