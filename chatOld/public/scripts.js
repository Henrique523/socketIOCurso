const socket = io('http://localhost:9000');
const socket2 = io('http://localhost:9000/admin')
console.log(socket.io);


socket.on('connect',()=>{
    console.log(socket.id);
})

socket2.on('connect',()=>{
    console.log(socket2.id);
})

socket2.on('welcome', (msg)=>{
    console.log(msg)
})

socket.on('messageFromServer',(dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit('dataToServer','Data from the client!!');
})

document.querySelector('#message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    // console.log(newMessage);
    socket.emit('newMessageToServer',{text: newMessage})
})

socket.on('messageToClients',(msg)=>{
    console.log(msg);
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})

// socket.on('ping',()=>{
//     console.log('Ping was received from the server');
// })

// socket.on('pong',(latency)=>{
//     console.log(latency);
//     console.log('Pong was sent to the server.');
// })