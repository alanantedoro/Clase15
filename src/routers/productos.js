const express = require('express');
const isAdmin = require('../middlewares/idADmin');
const { getAllProducts, createProduct, getOneProduct, deleteOneProduct, updateProduct } = require('../models/productos');

const productosRouter = express.Router();
//done
productosRouter.get('/', async (req, res) => {
  const list = await getAllProducts();
  res.send({
    message: 'Operation successfull',
    data: list
  });
});

//done 
productosRouter.post('/',isAdmin, async (req, res) => {
  const newProduct = req.body;

  const idProductSaved = await createProduct(newProduct);

  res.send({
    data: idProductSaved
  });
});
//done
productosRouter.get('/:id', async (req, res) => {
  const idRequested = req.params.id;

  const productReq = await getOneProduct(idRequested);

  if (!productReq) {
    res.send({
       message: `No existe el producto con el id ${idRequested}`,
    });
  }
    
   else {
    res.send({
    data: {productReq}
  });

}});

//done
productosRouter.delete('/:id',isAdmin, async (req, res) => {
  const idRequested = req.params.id;
  const findProduct = await getOneProduct(idRequested);

  if (!findProduct) {
        res.send({
            message: `No existe un producto con el id ${idRequested}`,
        });
    }
    
    else {
        await deleteOneProduct(idRequested);
        res.send({
            message: `ID ${idRequested} eliminado`,
        });
    }

});

productosRouter.put('/:id',isAdmin, async (req, res) => {
  const idRequested = req.params.id;
  const updatedProduct = req.body;
  const findProduct = await getOneProduct(idRequested);


  if (!findProduct) {
        res.send({
            message: `No existe un producto con el id ${idRequested}`,
        });
    }
    
    else {
        await updateProduct(idRequested, updatedProduct);
        res.send({
            message: `ID ${idRequested} actualizado`,
        });
    }

});

module.exports = productosRouter;