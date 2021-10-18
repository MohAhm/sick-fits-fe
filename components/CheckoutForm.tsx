import { useMutation } from "@apollo/client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import useCart from "../lib/useCart";

import SickButton from "./styles/SickButton";
import { CURRENT_USER_QUERY } from "./User";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

interface ICheckoutFormProps {}

export const CheckoutForm: React.FC<ICheckoutFormProps> = () => {
  const [error, setError] = useState<StripeError>();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: checkoutError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // 1. Start the page transition
    nProgress.start();

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    // 2. Create the payment method via stripe
    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      console.log("paymentMethod:", paymentMethod);
      // 3. Handle any errors from stripe
      if (error) {
        setError(error);
        nProgress.done();
        return;
      }

      const order = await checkout({
        variables: {
          token: paymentMethod?.id,
        },
      });
      console.log("Finished with the order:", order);
      // 4. Change the page to view the order
      router.push({
        pathname: `/order/[id]`,
        query: { id: order.data.checkout.id },
      });
      // 7. Close the cart
      closeCart();
    }

    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {checkoutError && <p style={{ fontSize: 12 }}>{checkoutError.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
};
