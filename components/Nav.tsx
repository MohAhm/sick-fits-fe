import Link from "next/link";
import NavStyles from "./styles/NavStyles";

interface INavProps {}

export const Nav: React.FC<INavProps> = () => {
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </NavStyles>
  );
};
