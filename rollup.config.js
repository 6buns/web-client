import resolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import "core-js";
import "regenerator-runtime/runtime.js";

export default {
    input: 'src/index.ts',
    output: [{
        name: 'Bun',
        file: 'dist/bundle.iife.js',
        format: 'iife'
    }, {
        name: 'Bun',
        file: 'dist/bundle.es.js',
        format: 'es'
    }],
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: false
        }),
        typescript({
            compilerOptions: {
                downlevelIteration: true,
            }
        }),
        builtins(),
        commonjs(),
        babel({
            include: ["**.js", "node_modules/**", "node_modules/events"],
            babelHelpers: "bundled",
            presets: [["@babel/preset-typescript"], ["@babel/preset-env", { "useBuiltIns": "usage" }]],
        }),
        terser(),
    ]
};
