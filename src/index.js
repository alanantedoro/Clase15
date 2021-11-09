const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const express = require('express');

const productosRouter = require('./routers/productos');
const { saveMessage, getMessages } = require('./models/messages');


const app = express();
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

 app.use(express.static('public'));

io.on('connection', async (socket) => {
  console.log(`Nuevo cliente conectado! ${socket.id}`)
  
  const messages = await getMessages()
  socket.emit('messages', messages)

  socket.on('new-message', async (message) => {
    console.log('new-message', message);
    await saveMessage(message)

    const messages = await getMessages()

    io.sockets.emit('messages', messages)
  })
})

app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );
app.set('view engine', 'ejs');

app.get('/', (req,res) => res.render('index'));

app.use('/api/productos', productosRouter);

httpServer.listen(8080, () => 
  console.log(`Servidor abierto en http://localhost:${8080}/`)
);