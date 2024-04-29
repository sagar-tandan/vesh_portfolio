import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   define: {
//     'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
//   },
// })


import { defineConfig } from 'vite';

export default defineConfig({
  // other vite configurations...
  plugins: [react()],

  build: {
    // Inject environment variables into the Vite project
    rollupOptions: {
      // Make sure to replace process.env.FIREBASE_API_KEY with your actual environment variable name
      plugins: [
        require('rollup-plugin-replace')({
          'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        }),
      ],
    },
  },
});
