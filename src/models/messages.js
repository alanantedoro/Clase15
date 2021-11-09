const messages = [
    { author: "Hola!", text: "Escribe aqui tus mensajes" },
  ];
  
  const Contenedor = require('../../Contenedor');
  const { sqliteOptions } = require('./databases');
  
  const messageContenedor = new Contenedor(sqliteOptions,'messages');
  
  const getMessages = async () => {
    return await messageContenedor.getAll();
  };
  
  const saveMessage = async (message) => {
    const idMessage = await messageContenedor.save(message);
    return idMessage;
  }
  
  module.exports = {
    getMessages,
    saveMessage
  };