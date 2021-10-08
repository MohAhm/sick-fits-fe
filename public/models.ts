
export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: {
    id: string;
    image: {
      publicUrlTransformed: string;
    };
  };
}

export interface IProducts {
  allProducts: IProduct[];
}

export interface IInputForm {
  [key: string]: string | number
}

export interface ICart {
  id: string
  quantity: number
  product: IProduct
}

export interface IUser {
  authenticatedItem: {
    id: string
    email: string
    name: string
    cart: ICart[]
  }
}