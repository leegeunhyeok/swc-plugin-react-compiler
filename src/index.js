import { resolve } from 'node:path';

export default resolve(
  import.meta.dirname,
  '..',
  'swc_plugin_react_compiler.wasm',
);
