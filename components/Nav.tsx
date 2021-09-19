import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";

interface INavProps {}

export const Nav: React.FC<INavProps> = () => {
  const user = useUser();
  console.log("User", user);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      )}
      {!user && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
};
