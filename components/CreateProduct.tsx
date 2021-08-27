import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import router from "next/router";
import useForm from "../lib/useForm";
import { ErrorMessage } from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import Form from "./styles/Form";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

export const CreateProduct: React.FC = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: "",
    name: "Nice Shoes",
    price: 32453,
    description: "These are the best shoes!",
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  // console.log("Test", createProduct);

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // Submit the inputs fields to the backend:
        const res = await createProduct();
        console.log(res);
        // clearForm()
        // Go to that product's page!
        router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};
