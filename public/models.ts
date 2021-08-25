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