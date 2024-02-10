import 'whatwg-fetch';

const _fetch = window.fetch.bind(window);

window.fetch = function f(url, args) {
  return _fetch(url, {
    credentials: 'same-origin',
    ...args,
  });
};
