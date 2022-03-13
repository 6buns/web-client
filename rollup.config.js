import resolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import { terser } from 'rollup-plugin-terser';
import "core-js";
import "regenerator-runtime/runtime.js";

export default {
    input: 'index.js',
    output: {
        name: 'Bun',
        file: 'dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        builtins(),
        resolve({
            browser: true,
        }),
        commonjs(),
        babel({
            include: ["**.js", "node_modules/**", "node_modules/events"],
            babelHelpers: "bundled",
            presets: [["@babel/preset-env", { "useBuiltIns": "usage" }]],
        }),
        // terser(),
    ]
};
