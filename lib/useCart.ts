import { useContext } from "react";

import { LocalStateContext } from './CartStateProvider'

export default function useCart() {
  const all = useContext(LocalStateContext)
  return all
}