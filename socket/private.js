// module.exports = function(io){
//     io.on('connection', socket => {
//         // socket.on("join chat", params => {
//         //     console.log(params);
//         //     socket.join(params.room1);
//         //     socket.join(params.room2);
//         //    // io.emit("refreshPage", { type: "new-message", text: message });
//         //   });  
        
//         socket.on("join_chat", params => {
//             socket.join(params.room1);
//             socket.join(params.room2);
//             io.emit("refreshPage", { type: "new-message", text: message });
//           });
//         console.log(`Socket ${socket.id} has connected`);
//     });
// }

