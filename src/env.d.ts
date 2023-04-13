import {
  AppElementData,
  DesignInteraction,
} from "./canva_api/design_interaction.d";
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SVG_CREATE_URL: string;
}

declare global {
  interface Window {
    canva: {
      designInteraction: DesignInteraction<any>;
    };
  }
}

export {};
