import { create } from "zustand";

interface ModalProps<P = Record<string, unknown>> {
  Component: React.FC<P>;
  props?: P;
}

interface StoreState {
  modals: ModalProps[];
  open: <P>(Component: React.FC<P>, props?: P) => void;
  close: () => void;
}

const useModalStore = create<StoreState>((set) => ({
  modals: [],

  open: (Component, props) => {
    set((state) => ({
      modals: [...state.modals, { Component, props } as ModalProps],
    }));
  },

  close: () => {
    set((state) => ({
      modals: state.modals.slice(0, -1),
    }));
  },
}));

export default useModalStore;
