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

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  const value = input.value;
  console.log(input);
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = '';
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#name input');
  const value = input.value;
  socket.emit('nickname', input.value);
}

function showRoom() {
  // 접속되면 입장 영역을 없애고 room이 보이도록 하기
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector('#msg');
  const nameForm = room.querySelector('#name');
  msgForm.addEventListener('submit', handleMessageSubmit);
  nameForm.addEventListener('submit', handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRoom); // 해당 방에 입장
  roomName = input.value;
  input.value = '';
}
form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`); // 누군가 입장했음을 알리기
});

socket.on('bye', (left, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left.`);
});

socket.on('new_message', addMessage); //새로운 메시지를 출력

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
});
