/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        noto: ['"Noto Sans KR"', "sans-serif"],
        sans: ["Pretendard", "Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
