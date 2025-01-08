
export type Product = {
  documentId: string;
  name: string;
  slug: string;
  price: number;
  stoks: {color:string; size:string; stock:number; colorName:string;}[];
  kategori: string;
  alt_kategori: string;
  sex: string;
  images: {url: string}[];
  aciklama: Block[];
};

export type Category = {
  categoryName: string;
  slug: string;
  alt_kategoris: {subCategoryName:string; slug:string}[]
}

export type DetailProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stoks: {color:string; size:string; stock:number; colorName:string;}[];
  kategori: string;
  alt_kategori: string;
  sex: string;
  images: {url: string}[];
  aciklama: Block[];
};

export type ProductFormDataType = {
  name: string;
  price: number;
  stock: number;
  sex: string;
  description: string;
  colorSize: ColorSizeType[];
  mainCategory: string | undefined;
  subCategory: string | undefined;
};

export type ValuesType = {
    name: string;
    price: string;
    stock: number;
    sex: string,
    description: string;
}

export type ColorSizeType = {
  size: string;
  colorName: string;
  stock: number;
};

export type Contact = {
  nameSurname: string;
  email: string;
  mobilePhoneNumber: string;
};

export type CartProduct = {
  product: Product;
  quantity: number;
  color: string;
  colorTagName: string;
  size: string;
};

export type OrderValuesType = {
  nameSurname: string,
  addressDetails: string,
  apartment: string,
  postalCode: string,
  email: string,
  phoneNumber: string
}

export type BasketItem = {
  id: string;
  name: string,
  category1: string,
  category2: string,
  price: number
}

export type OrderProduct = {
  orderProducts: {
    productId: string;
    productName: string;
    imageUrl: string;
    color: string;
    size: string;
    quantity: number
  }[];
  totalPrice: number;
  nameSurname: string;
  address: {
    city: string;
    state: string;
    apartment: string;
    zipCode: string;
    addressDetails: string
  };
  phoneNumber: string;
  email: string;
  status: string;
  createdAt: string;
  id: string;
}

export type Menu = {
  title: string;
  path: string;
};

interface Block {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}