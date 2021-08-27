import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import { ErrorMessage } from "./ErrorMessage";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-content: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item: Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

interface ISingleProductProps {
  id: string;
}

export const SingleProduct: React.FC<ISingleProductProps> = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  // console.log({ data, loading, error });

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { item } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {item.name}</title>
      </Head>
      <img
        src={item.photo.image.publicUrlTransformed}
        alt={item.photo.altText}
      />
      <div className="details">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
    </ProductStyles>
  );
};
