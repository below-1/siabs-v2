export default function debounce(f, wait) {
  let timeout;
  return function debounceWrapped(...args) {
    const later = () => {
      clearTimeout(timeout);
      f(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}