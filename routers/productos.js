const express = require('express');

const Contenedor = require('../Contenedor');

const productosContenedor = new Contenedor('./data/productos.json');
const productosRouter = express.Router();

productosRouter.get('/form', async (req, res) => {
 
  res.render('../views/pages/form');
})

productosRouter.post('/form', async (req, res) => {
  
  const nuevoProducto = req.body;

  const idProductoGuardado = await productosContenedor.save(nuevoProducto);
    res.send({
      message: 'Producto guardado',
      data: {
        ...nuevoProducto,
        id: idProductoGuardado
      }
  });

})


module.exports = productosRouter;

console.log(__dirname);