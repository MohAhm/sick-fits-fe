import React from "react";
import calcTotalPrice from "../calcTotalPrice";
import formatMony from "../lib/formatMony";
import { CartItem } from "./CartItem";

import CartStyles from "./styles/CartStyles";
import CloseButton from "./styles/CloseButton";
import Supreme from "./styles/Supreme";
import { useUser } from "./User";
import useCart from "../lib/useCart";

interface ICartProps {}

export const Cart: React.FC<ICartProps> = () => {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!me) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMony(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
};
