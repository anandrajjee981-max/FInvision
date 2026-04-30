import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),{
      name: 'force-exit',
      apply: 'build',
      closeBundle() {
        setTimeout(() => {
          console.log('Build finished, forcing exit...');
          process.exit(0);
        }, 100);
      },
    }],
  // 'base' line ko hata diya hai Vercel ke liye
})