import { cartDao } from "../persistence/mongo/dao/cart.dao.js";
import { productDao } from "../persistence/mongo/dao/product.dao.js";
import { productServices } from "./product.services.js";

class CartServices {
  async createCart() {
    return await cartDao.create();
  }

  async getCartById(cid) {
    return await cartDao.getById(cid);
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    const productInCart = cart.products.find((element) => element.product._id == pid);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async deleteProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    cart.products = cart.products.filter((element) => element.product._id != pid);
    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async updateQuantityProductInCart(cid, pid, quantity) {
    // Verifica que quantity sea un número positivo
    if (typeof quantity !== 'number' || quantity <= 0) {
      throw new Error("La cantidad debe ser un número mayor a 0");
    }
    const cart = await cartDao.getById(cid);
    const product = cart.products.find((element) => element.product._id == pid);
    product.quantity = quantity;
    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async clearProductsToCart(cid) {
    const cartUpdate = await cartDao.update(cid, { products: [] });
    return cartUpdate;
  }
  async purchaseCart(cid) {
    const cart = await cartDao.getById(cid);

    let total = 0;
    const products = [];


    for (const productCart of cart.products) {

      const prod = await productServices.getById(productCart.product._id);

      if (prod.stock >= productCart.quantity) {
        total += prod.price * productCart.quantity;
        await productServices.update(prod._id, { stock: prod.stock - productCart.quantity });
      } else {
        products.push(productCart);
      }
      await cartDao.update(cid, { products });
    }
  }

}

export const cartServices = new CartServices();