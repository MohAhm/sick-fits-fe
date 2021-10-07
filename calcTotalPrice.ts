import { ICart } from './public/models';

export default function calcTotalPrice(cart: any) {
  console.log('Cart', cart)
  return cart?.reduce((tally: any, cartItem: ICart)  => {
    if (!cartItem.product) {
      return tally
    }
    return tally + cartItem.quantity * cartItem.product.price
  }, 0)
}