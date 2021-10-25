const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Contenedor = require('./Contenedor');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );

app.use( express.static('public') );

app.set('view engine', 'ejs');

const port = 8080;
const productosContenedor = new Contenedor('./data/productos.json');
const messagesContenedor = new Contenedor('./data/messages.json');


io.on('connection', async socket => {
    console.log(`¡Nuevo cliente conectado! socketid: ${socket.id}`);
    socket.on('new-product',async product => {
      await productosContenedor.save(product);
      const products = await productosContenedor.getAll();
      io.sockets.emit('products', products);
    });
      socket.on('new-message',async message => {
      await messagesContenedor.save(message);
      const messages = await messagesContenedor.getAll();
      io.sockets.emit('messages', messages);
    });
});

app.get('/form', async (req, res) => {
 
  res.render('../views/pages/form');
})



const server = httpServer.listen(port, () => 
    console.log(`Servidor abierto en http://localhost:${port}/`)
)

server.on('error', error => console.log('Error en servidor:', error));