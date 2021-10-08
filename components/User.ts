import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { IUser } from "../public/models";

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`; 

export function useUser() {
  const { data } = useQuery<IUser>(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}