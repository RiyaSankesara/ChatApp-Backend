const { use } = require("../routes/authRoute");


module.exports = function(io,User , _){
  const userData = new User();
    io.on('connection', socket => {
        // socket.on("join_chat", params => {
        //     socket.join(params.room1);
        //     socket.join(params.room2);
        //    // io.emit("refreshPage", { type: "new-message", text: params });
        //   });
        socket.on("refresh", params => {
          socket.join(params.room1);
          socket.join(params.room2);
            io.emit("refreshPage", params );
          });
          socket.on("start_typing",data => {
            io.to(data.receiver).emit('is_typing',data);
          })
          socket.on("stop_typing",data => {
            io.to(data.receiver).emit('has_stopped_typing',data);
          });

          socket.on("online",(data) => {
            console.log(data);
            socket.join(data.room);
            userData.EnterRoom(socket.id,data.name,data.room);
            const list = userData.getList(data.room);
            io.emit('usersOnline', _.uniq(list));
            console.log(list);
          });

          socket.on('disconnect', () => {
            const user = userData.removeUser(socket.id); 
            console.log(user);
            if(user){
              const userObj = userData.getList(user.room);
              const arr = _.uniq(userObj);
              console.log(arr);
              _.remove(arr, n => n === user.name);
              io.emit('usersOnline', arr);
            }
          })

        console.log(`Socket ${socket.id} has connected`);
    });

    // io.on('connection', socket => {
    //     console.log("Connected");
    //     socket.on('refresh', data => {
    //         io.emit('refreshPage', {});
    //     })
    // });
    // io.on("connection", socket => {
    //     // Log whenever a user connects
    //     console.log("user connected");
      
    //     // Log whenever a client disconnects from our websocket server
    //     socket.on("disconnect", function() {
    //       console.log("user disconnected");
    //     });
      
    //     // // When we receive a 'message' event from our client, print out
    //     // // the contents of that message and then echo it back to our client
    //     // // using `io.emit()`
    //     // socket.on("refresh", message => {
    //     //   console.log("Message Received: " + message);
    //     //   io.emit("refresh", { type: "new-message", text: message });
    //     // });
    //     socket.on("message", message => {
    //         console.log("Message Received: " + message);
    //         io.emit("message", { type: "new-message", text: message });
    //       });
    //   });

} 