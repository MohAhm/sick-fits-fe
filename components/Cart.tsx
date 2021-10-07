import React from "react";
import calcTotalPrice from "../calcTotalPrice";
import formatMony from "../lib/formatMony";
import { ICart } from "../public/models";
import { CartItem } from "./CartItem";

import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import { useUser } from "./User";

interface ICartProps {}

export const Cart: React.FC<ICartProps> = () => {
  const me = useUser();

  if (!me) return null;

  console.log("Me", me);

  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem: ICart) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMony(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
};
