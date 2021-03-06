import Link from "next/link";
import { IProduct } from "../public/models";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMony from "../lib/formatMony";
import { DeleteProduct } from "./DeleteProduct";
import { AddToCart } from "./AddToCart";

interface IProductProps {
  product: IProduct;
}

export const Product: React.FC<IProductProps> = ({ product }) => {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMony(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "update",
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
};
