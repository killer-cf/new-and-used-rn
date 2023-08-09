import { ModalContext } from "@contexts/FilterModalProvider";
import { useContext } from "react";

export function useAdFilter() {
  const context = useContext(ModalContext)

  return context
}