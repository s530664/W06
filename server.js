let express = require('express')
// 1. add two more requires at the end of the requires

let app = express() // function handler
let http = require('http').createServer(app)  // http server
let io = require('socket.io')(http)
let path = require('path')

// Initialize app with route / (the root) "on getting a request to /, do the following"
// 2. replace the inside lines of your app.get 
app.get('/', function (req, res) {
  app.use(express.static(path.join(__dirname)))   
  res.sendFile(path.join(__dirname, '../W06/assets', 'chat.html'))
})
http.listen(8081, function () {
  console.log('listening on http://127.0.0.1:8081/')
})
  
// 3. Add the following function
io.on('connection', function(socket){ 
  socket.on('chatMessage', function(from, msg){
       io.emit('chatMessage', from, msg)  
  })
  socket.on('notifyUser', function(user){
       io.emit('notifyUser', user)  
  })
})
// Listen for an application request on port 8081
// use http listen, so we can provide a callback when listening begins
// use the callback to tell the user where to point their browser

  
