const Messages = require('./models/messages');
const Chat = require('./models/chat');
const User = require('./models/user')

exports.init = function(io) {

    io.on('connection', function(socket) {
        console.log('Connection Setup to socket');

        socket.on('online', data => {
            User
                .findById(data.user)
                .then((user) => {
                    user.online = true;
                    user.save();
                })
                .catch(err => {
                    console.log(err)
                })
        })
        
        socket.on('join-room', data => {

            // chat.id is coming in data.room
            socket.join(data.room);
            io.to(data.room).emit('room-joined', 'room Joined successfully!');
        })


        socket.on('typing', (data) => {
            io.to(data.room).emit('on-typing', true);

        })

        socket.on('new-message', data => {
            let messages = new Messages({
                chat: data.room,
                to: data.to,
                from: data.from,
                message: data.message
            })


            messages
                .save()
                .then(async () => {
                    return await Chat.findById(data.room)
                })
                .then((chat) => {
                    chat.lastMsg = data.message;
                    
                    return chat.save()
                })
                .then(() => {
                    io.to(data.room).emit('on-new-message', {
                        chat: data.chat,
                        to: data.to,
                        from: data.from,
                        message: data.message
                    });
                })
                .catch(err => {
                    console.log(err)
                })
            
        })

        // call on window.unloadEvent or logout

        socket.on('disconnected', data => {
            User
                .findById(data.user)
                .then((user) => {
                    user.online= false;
                    user.save()
                })
                .catch(err => {
                    console.log(err)
                })
        })

        socket.on('disconnect', (data) => {
            var rooms = io.sockets.adapter.sids[socket.id]; 
            for(var room in rooms) {       
                socket.leave(room);     
            }
        })
    });    


} 