import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import image from '@rollup/plugin-image';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),  image()],
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5137,
        hmr: {
            overlay: false,
            clientPort: 5137,
        }
    },
})
