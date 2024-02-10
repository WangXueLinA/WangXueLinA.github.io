import storage from './index';

export const local = new storage({ name: 'local-', type: 'localStorage' });

export const localClear = new storage({
  name: 'local2-',
  type: 'localStorage',
});

export const session = new storage({
  name: 'session-',
  type: 'sessionStorage',
});
