const Contenedor = require('../../Contenedor');
const {options} = require('./databases')
const productosContenedor = new Contenedor(options, 'products');

const getAllProducts = async () => {
  const list = await productosContenedor.getAll();
  return list;
}


const createProduct = async(product) => {
  const idProductSaved = await productosContenedor.save(product);
  return idProductSaved;
}

const getOneProduct = async (id) => {
  const productReq = await productosContenedor.getByID(id);
  return productReq;
}

const deleteOneProduct = async (id) => {
  const productReq = await productosContenedor.deleteById(id);

}

const updateProduct = async (id, product) => {
  const productReq = await productosContenedor.update(id, product);

}

 const productsById = async (productos) => {

  const ids = productos.map( producto => producto.id );

  const results = [];

  for (const products of ids) {
  const producto = await productosContenedor.getByID(products);
  if(!producto) return {
      error: `No existe un producto de id ${ products }`
      }
  results.push(producto);
  }
  return results;
}

module.exports = {
  getAllProducts,
  createProduct,
  getOneProduct,
  deleteOneProduct,
  updateProduct,
  productsById
};
