/** Tailwind v4: sem isto, `@import "tailwindcss"` em `app/globals.css` não é compilado (CSS “some” no deploy). */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
