const {productoModel,productosSchemaJoi} = require("../schemas/productos");
//const products = new productoModel()

class productos {
  async getMyProducts(id) {
    const productos = await productoModel.find({userId:id});
    return productos || [];
  }
  async getProducts(id) {
    const productos = await productoModel.find();
    return productos || [];
  }

  async createProduct(data) {
    const validacion = productosSchemaJoi.validate(data)
    //console.log(validacion.error)

    if(!validacion.error){
        const productoGuardado = await productoModel.create(data)

        return {data:productoGuardado,success:true,message:"Producto creado exitosamente"}
    }

    return {data:validacion.value,success:false,message:validacion.error.details[0].message}

  }

  // async createProduct(data) {
  //   try{
  //     //const newProduct = new productoModel(data)
  //     //await newProduct.save()
  //     const newProduct = await productoModel.create(data);
  //     return newProduct || {};
  //   }catch(err){
  //     console.log('error al crear un productoModel',err.errors['precio'].properties.message)
  //   }

  // }
  async validateId(idLogin,idItem){
    const item = await productoModel.findById(idItem)
    if (idLogin === item.userId){
      return true
    }
    return false
  }

  async updateProduct(id, data) {
    const product = await productoModel.findByIdAndUpdate(id, data);
    return product || {};
  }
  async deletProduct(id) {
    const productId = await productoModel.findByIdAndDelete(id);
    return productId || {};
  }
}
module.exports = productos;
