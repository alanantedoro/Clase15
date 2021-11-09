console.log({io});
const socket = io.connect();

const renderMessages = (messages) => {
  const htmls = messages.map((messsage) => {
    return(`
      <div>
        <strong>${messsage.name}</strong>:
        <em>${messsage.message}</em>
      </div>
    `);
  });

  const html = htmls.join(" ");

  document.getElementById('messages').innerHTML = html;
}

const addMessage = (event) => {
  event.preventDefault();

  const mensaje = {
    name: document.getElementById('username').value,
    message: document.getElementById('texto').value
  };

  socket.emit('new-message', mensaje);

  document.getElementById('username').value = '';
  document.getElementById('texto').value = '';
};

const form = document.getElementById('form');
form.addEventListener('submit', addMessage);

socket.on('messages', data => {
  console.log(data);
  renderMessages(data);
});