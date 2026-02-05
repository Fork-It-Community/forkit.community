interface OrejimeManager {
  show: () => void;
  hide: () => void;
  getConsents: () => Record<string, boolean>;
}

declare global {
  interface Window {
    // Orejime library (from CDN)
    Orejime?: {
      init: (config: any) => OrejimeManager;
      show: () => void;
      hide: () => void;
      getConsents: () => Record<string, boolean>;
    };
    // Manager instance (lowercase, set in RootLayout)
    orejime?: OrejimeManager;
    // Configuration object
    orejimeConfig?: any;
  }
}

export {};
