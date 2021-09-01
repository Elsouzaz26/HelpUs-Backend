const Messages = require('./models/messages');
const Chat = require('./models/chat');
const User = require('./models/user')

exports.init = function(io) {

    io.on('connection', function(socket) {
        console.log('Connection Setup to socket');

        
        socket.on('join-room', data => {

            var rooms = io.sockets.adapter.sids[socket.id]; 
            console.log(rooms)
            
            socket.join(data.room);
            io.to(data.room).emit('room-joined', 'room Joined successfully!');
        })


        socket.on('typing', (data) => {
            io.to(data.room).emit('on-typing', true);

        })

        socket.on('new-message', async (data )=> {
            let messages = new Messages({
                chat: data.room,
                to: data.to,
                from: data.from,
                message: data.message
            })

            const user1 = await User.findById(data.to)
            const user2 = await User.findById(data.from)

            messages
                .save()
                .then(async () => {
                    return await Chat.findById(data.room)
                })
                .then((chat) => {
                    chat.lastMsg = data.message;
                    chat.createdAt = new Date()
                    return chat.save()
                })
                .then(() => {
                    console.log(data.room)
                    io.to(data.room).emit('on-new-message', {
                        chat: data.room,
                        to: user1,
                        from: user2,
                        message: data.message
                    });
                })
                .catch(err => {
                    console.log(err)
                })
            
        })

        // call on window.unloadEvent or logout

        // socket.on('disconnected', data => {
        //     User
        //         .findById(data.user)
        //         .then((user) => {
        //             user.online= false;
        //             user.save()
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // })

        socket.on('disconnect', (data) => {

            console.log(data)
            var rooms = io.sockets.adapter.sids[socket.id]; 
            for(var room in rooms) {       
                socket.leave(room);     
            }
        })
    });    


} 