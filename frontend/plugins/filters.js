import Vue from 'vue';

Vue.filter('truncate', (val) => {
  const maxLength = 60;
  if (val.length <= maxLength) { return val; }
  return `${val.substr(0, val.lastIndexOf(' ', maxLength))}...`;
});

Vue.filter('splitCamelCase', (val) => {
  return val.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
});

Vue.filter('firstUpper', (val) => {
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
});
