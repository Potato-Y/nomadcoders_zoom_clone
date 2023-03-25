const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true; // 기본적으로 room을 보이지 않게하기

let roomName;

function addMessage(message) {
  // 메시지 추가
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom() {
  // 접속되면 입장 영역을 없애고 room이 보이도록 하기
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRoom); // 해당 방에 입장
  roomName = input.value;
  input.value = '';
}
form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', () => {
  addMessage('someone joined!'); // 누군가 입장했음을 알리기
});
