const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/chat-group-app/", function(req, res) {
  // res.send("Hello world!");
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", function(socket) {
  socket.on("username", function(username) {
    socket.username = username;
    io.emit(
      "is_online",
      "\ud83d\udcac <i>" + socket.username + " join the chat..</i>"
    );
  });

  socket.on("disconnect", function(username) {
    io.emit(
      "is_online",
      "\ud83d\udca4 <i>" + socket.username + " left the chat..</i>"
    );
  });

  socket.on("chat_message", function(message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});

const server = http.listen(8080, function() {
  console.log("listening on *:8080");
});

// const server = http.createServer((req, res) => {
//   let lastChat;
//   if (req.url == "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     const htmlFile = "index.html";
//     fs.stat(`./${htmlFile}`, (err, stats) => {
//       if (stats) {
//         res.statusCode = 200;
//         fs.createReadStream(htmlFile).pipe(res);
//       }
//     });
//   } else if (req.url == "/getChat") {
//     res.writeHead(200, { "Content-Type": "text/html" });

//     const chat = fs.createReadStream(__dirname + "/data.txt", {
//       encoding: "utf8"
//     });
//     chat.on("data", buffer => {
//       res.write(buffer);
//       res.end();
//     });
//   } else if (req.url == "/setChat") {
//     var body = "";
//     req.on("data", function(chunk) {
//       body += chunk;
//     });
//     //process data on the back-end
//     req.on("end", function() {
//       //to use chat variable again to read the history chat
//       let lastChat;
//       const chat = fs.createReadStream(__dirname + "/data.txt", {
//         encoding: "utf8"
//       });

//       chat.on("data", buffer => {
//         lastChat = buffer;

//         //convert data(string) to objects and get parameters
//         nick = JSON.parse(body).nickName;
//         msg = JSON.parse(body).message;
//         console.log("POSTed: " + body);
//         const newChat = fs.createWriteStream(__dirname + "/data.txt");
//         newChat.write(`${lastChat} \n ${nick} : ${msg}\n`);
//         res.writeHead(200);
//         res.end(
//           "<html><body><p>Your Request has been received!</p></body></html>"
//         );
//       });
//     });
//   }
// });
