/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SVG_CREATE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
