export interface IProducts {
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

export interface IProductsData {
  allProducts: IProducts[];
}

export interface IInputForm {
  [key: string]: string | number
}

export interface ICart {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    description: string
    photo: {
      image: {
        publicUrlTransformed: string
      }
    }
  }
}