const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

io.on('connection', (socket) => {
  console.log('connected');

  let min = 10;
  let wmax = 100;
  let hmax = 100;

  socket.on('sizedata', (res) => {
    hmax = res.h - 50;
    wmax = res.w - 50;
  });

  const shapes = ["circle", "square"];
  setInterval(() => {
    const randomshape = Math.floor(Math.random() * shapes.length);
    let x = parseInt(Math.random() * (wmax - min) + min) ;
    let y = parseInt(Math.random() * (hmax - min) + min) ;
    socket.emit('data',{ type : shapes[randomshape] , location :  { x : x , y : y}});
  }, 1000);

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
