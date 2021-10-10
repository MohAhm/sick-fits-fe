import React from "react";
import styled from "styled-components";
import formatMony from "../lib/formatMony";
import { ICart } from "../public/models";
import { RemoveFromCart } from "./RemoveFromCart";

interface ICartItemProps {
  cartItem: ICart;
}

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

export const CartItem: React.FC<ICartItemProps> = ({ cartItem }) => {
  const { product } = cartItem;

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMony(product.price * cartItem.quantity)} -
          <em>
            {cartItem.quantity} &times; {formatMony(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};
