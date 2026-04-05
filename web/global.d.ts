/** Extensões usadas por `public/assets/js/translate.js` no browser. */
export {};

declare global {
  interface Window {
    setLanguage?: (lang: string) => void;
    initTranslation?: () => void;
  }
}
