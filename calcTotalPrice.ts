import { ICart } from './public/models';

export default function calcTotalPrice(cart: ICart[]) {

  return cart?.reduce((tally, cartItem)  => {
    if (!cartItem.product) {
      return tally
    }
    return tally + cartItem.quantity * cartItem.product.price
  }, 0)
}