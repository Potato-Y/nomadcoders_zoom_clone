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

setTimeout(() => {
  socket.send('hello from the browser!');
}, 10000);
