import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  let base = '/' // In dev, use root path
  if (command === 'build') { // To be served under nested path in github pages.
    base = '/ShoppingList';
  }
  return {
    base,
    plugins: [react()],
  }
})
