import { transform } from '@swc/core';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pluginPath = resolve(
  here,
  '../../target/wasm32-wasip1/release/swc_plugin_react_compiler.wasm',
);

const result = await transform('const answer: number = 42;\n', {
  filename: 'example.ts',
  jsc: {
    parser: {
      syntax: 'typescript',
    },
    target: 'es2022',
    experimental: {
      plugins: [[pluginPath, {}]],
    },
  },
});

console.log(result.code);
