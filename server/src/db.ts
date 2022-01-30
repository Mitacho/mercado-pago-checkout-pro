import type { Product, User } from "./entities";

export const products: Array<Product> = [
  {
    id: "1234",
    title: "Samsung Galaxy Z Fold 2",
    description: "Celular de Tienda e-commerce",
    pictureUrl:
      "https://images.samsung.com/is/image/samsung/p5/nl/smartphones/galaxy-z-fold2/buy/carousel/mo/002_Z-Fold2-MysticBlack-dynamic-GalleryImage.jpg",
    unitPrice: 70.8,
    categoryId: "eletronics",
    quantity: 10,
  },
];

export const users: Array<User> = [
  {
    id: "1",
    email: "test_user_92801501@testuser.com",
    name: "Lalo",
    surname: "Landa",
    phone: {
      areaCode: "55",
      number: "98529-8743",
    },
    identification: {
      type: "CPF",
      number: "12345678909",
    },
    address: {
      streetName: "Insurgentes Sur",
      streetNumber: 1602,
      zipCode: "78134-190",
    },
  },
];
