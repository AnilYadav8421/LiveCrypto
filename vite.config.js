import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { extend } from 'lodash'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  theme: {
    extend: {
      fontFamily: { nunito: "Nunito" },
    },
    colors: {
      gray: { 100: "#808080", 200: "#323232", 300: "#212121" },
      white: "#fff",
      cyan: "#14ffec",
      red: "#d6436e",
      green: "#25da72",
    },
    fontSize: {
      sm: "14px", md: "18px", lg: "24px", xl: "32px", base: "16px"
    }
  }
})
