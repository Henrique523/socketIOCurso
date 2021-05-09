const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./data/namespaces');
//console.log(namespaces[0]);
app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9000);
const io = socketio(expressServer);


io.on('connection',(socket)=>{
    // console.log(socket.handshake);
    // build an array to send back with the img and endpoint for each NS
    let nsData = namespaces.map((ns)=>{
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    // console.log(nsData);
    // send the nsData back to the client. We need to use socket, NOT io, because we want it to go to just this client.
    socket.emit('nsList',nsData);
})

// loop through each namespace and listen for a connection
namespaces.forEach((namespace)=>{
    //console.log(namespace);
    // const thisNs = io.of(namespace.endpoint).on()
    io.of(namespace.endpoint).on('connection',(nsSocket)=>{
        const username = nsSocket.handshake.query.username;
        // console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
        // a socket has connected to one of our chatgroup namespaces.
        // Send tha ns group info back.
        nsSocket.emit('nsRoomLoad',namespace.rooms)
        nsSocket.on('joinRoom',(roomToJoin,numberOfUsersCallback)=>{
            // deal with history... once we have it
            console.log(nsSocket.rooms);
            const roomToLeave = Object.keys(nsSocket.rooms)[1];
            nsSocket.leave(roomToLeave);
            updateUsersInRoom(namespace, roomToLeave);

            nsSocket.join(roomToJoin)
            // io.of(namespace.endpoint).in(roomToJoin).clients((error, clients)=>{
            //     console.log(clients.length)
            //     numberOfUsersCallback(clients.length);
            // })
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomToJoin;
            })
            nsSocket.emit('historyCatchUp', nsRoom.history)
            updateUsersInRoom(namespace, roomToJoin);
        })
        nsSocket.on('newMessageToServer',(msg)=>{
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: username,
                avatar: 'https://via.placeholder.com/30'
            }
            // console.log(fullMsg)
            // Send this message to ALL the sockets that are in the room that THIS socket is in.
            // How can we find out what room THIS socket is in?
            // console.log(nsSocket.rooms)
            // the user will be in the 2nd room in the object list
            // This is because the socket ALWAYS join its own room on connection
            // get the keys
            const roomTitle = Object.keys(nsSocket.rooms)[1];
            //  we need to find the Room object for this room
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomTitle;
            })
            // console.log("The room object tha we made that matches this NS room is...")
            // console.log(nsRoom)
            nsRoom.addMessage(fullMsg);
            io.of(namespace.endpoint).to(roomTitle).emit('messageToClients',fullMsg)
        })
    })

})

function updateUsersInRoom(namespace, roomToJoin){
    // Send back the number of users in THIS room to ALL sockets connected to this room
    io.of(namespace.endpoint).in(roomToJoin).clients((error, clients)=>{
        // console.log(`There are ${clients.length} in this room`);
        io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers',clients.length);
    })
}