

module.exports = function(io){

    io.on('connection', socket => {
    
        socket.on("refresh", message => {
            console.log("Message Received: " + message);
            io.emit("refresh", { type: "new-message", text: message });
          });
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