import { StoreApi, UseBoundStore } from "zustand";
import { HsrOptimizerStore } from "types/store";

declare global {
  interface Window {
    setCharacterRows: Function;
    setRelicRows: Function;
    store: UseBoundStore<StoreApi<HsrOptimizerStore>>;
  }
}

