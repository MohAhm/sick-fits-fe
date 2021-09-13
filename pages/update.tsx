import { UpdateProduct } from "../components/UpdateProduct";

export default function UpdatePage({ query }: { query: any }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
