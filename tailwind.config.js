/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,js,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        footergray: {
          light: '#60739f',
          DEFAULT: '#60739f',
          dark: '#c5c9d4',
        },
        footerhovergray: {
          light: '#222939',
          DEFAULT: '#222939',
          dark: '#f5f7fc',
        },
      },
      listStyleType: {
        circle: 'circle',
        square: 'square',
        roman: 'upper-roman',
      },
      screens: {
        x3lmax: { max: "2550px" },
        // => @media (max-width: 1535px) { ... }
        
        x2lmax: { max: "1650px" },
        // => @media (max-width: 1279px) { ... }
        
        xlmax: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }
        
        lgmax: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }
        
        mdmax: { max: "767px" },
        // => @media (max-width: 767px) { ... }
        
        smax: { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
}
