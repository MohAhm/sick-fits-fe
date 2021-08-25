import Link from "next/link";
import { IProducts } from "../public/models";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMony from "../lib/formatMony";

interface IProductProps {
  product: IProducts;
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
      {/* TODO: Add buttons to edit and delete item */}
    </ItemStyles>
  );
};
