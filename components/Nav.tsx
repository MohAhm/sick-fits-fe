import Link from "next/link";
import useCart from "../lib/useCart";
import { SignOut } from "./SignOut";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";

interface INavProps {}

export const Nav: React.FC<INavProps> = () => {
  const user = useUser();
  const { openCart } = useCart();

  // console.log("User", user);

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button onClick={openCart}>My Cart</button>
          <SignOut />
        </>
      )}
      {!user && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
};
