const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('connected to browser');
});

socket.addEventListener('message', (msg) => {
  console.log('Just got this: ', msg.data, 'from the server');
});

socket.addEventListener('close', () => {
  console.log('Disconnected from Server');
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(input.value);
  input.value = '';
}
messageForm.addEventListener('submit', handleSubmit);
