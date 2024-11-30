const io = require('socket.io')(4000, {
    cors: {
      origin: '*',
    },
  });
  
  setInterval(() => {
    io.emit('updateData', {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      storage: Math.floor(Math.random() * 100),
    });
  }, 3000);
  