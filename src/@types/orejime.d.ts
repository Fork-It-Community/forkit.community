interface OrejimeManager {
  prompt: () => void;
}

declare global {
  interface Window {
    // Orejime library (from CDN), types not complete to avoid confusion, using
    // only what's needed
    Orejime?: {
      init: (config: any) => OrejimeManager;
      prompt: () => void;
    };
    // Manager instance (lowercase, set in RootLayout)
    orejime?: OrejimeManager;
    // Configuration object
    orejimeConfig?: any;
  }
}

export {};
