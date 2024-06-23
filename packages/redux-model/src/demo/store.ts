import createStore from '../core/createStore';

// @ts-expect-error: Unreachable code error
const files = require.context('./modules', true, /\w.ts$/);
const modules = files.keys().map((key: string) => {
  return files(key).default;
});

export default createStore(modules, { loadingModel: true });
