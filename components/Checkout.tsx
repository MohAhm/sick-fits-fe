import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { CheckoutForm } from "./CheckoutForm";

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

interface ICheckoutProps {}

export const Checkout: React.FC<ICheckoutProps> = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
};
