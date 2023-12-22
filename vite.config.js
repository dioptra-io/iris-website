import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import process from "eslint-plugin-vue/lib/configs/base";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), nodePolyfills()],
    resolve: {
        alias: {
            'node:stream': 'stream-browserify',
        },
    },
    define: {
        'process.env': process.env
    }
})