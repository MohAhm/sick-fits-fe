import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

interface IAddToCartProps {
  id: string;
}

export const AddToCart: React.FC<IAddToCartProps> = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button
      disabled={loading}
      type="button"
      onClick={() => addToCart({ variables: { id } })}
    >
      Add{loading && "ing"} To Cart 🛒
    </button>
  );
};
