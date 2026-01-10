import type Alpine from "alpinejs";

declare global {
  interface Window {
    Alpine: typeof Alpine;
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export {};
