const producto = require("../schemas/productos");

//const products = new producto()

class productos {
  async getProducts() {
    const productos = await producto.find();
    return productos || [];
  }

  async createProduct(data) {
    //const newProduct = new producto(data)
    //await newProduct.save()
    const newProduct = await producto.create(data);
    return newProduct || {};
  }

  async updateProduct(id, data) {
    const product = await producto.findByIdAndUpdate(id, data);
    return product || {};
  }
  async deletProduct(id) {
    const productId = await producto.findByIdAndDelete(id);
    return productId || {};
  }
}
module.exports = productos;
