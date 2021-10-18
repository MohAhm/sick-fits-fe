import React, { createContext, useState } from "react";

interface ICartState {
  cartOpen: boolean;
  setCartOpen?: (cartOpen: boolean) => void;
  closeCart: () => void;
  openCart: () => void;
}

export const LocalStateContext = createContext<ICartState>({
  cartOpen: false,
  closeCart: () => {},
  openCart: () => {},
});

export const CartStateProvider: React.FC = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        closeCart,
        openCart,
      }}
    >
      {children}
    </LocalStateContext.Provider>
  );
};
