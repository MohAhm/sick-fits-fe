import { SingleProduct } from "../../components/SingleProduct";

export default function SingleProductPage({ query }: { query: any }) {
  return <SingleProduct id={query.id} />;
}
