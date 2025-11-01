/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
          extend: {
               colors: {
                    primary: "#368467",
                    secondary: "#2F7059",
                    background: "#F2F2F2",
               },
          },
     },
     plugins: [],
};
