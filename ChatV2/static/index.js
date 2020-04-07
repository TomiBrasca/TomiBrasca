var user = localStorage.getItem("username");
if (user == null) {
  localStorage.setItem("username", window.prompt("Please input your name"));
  user = localStorage.getItem("username");
} else {
  alert("Hello " + user);
}

document.addEventListener("DOMContentLoaded", function () {
  var socket = io.connect(
    location.protocol + "//" + document.domain + ":" + this.location.port
  );

  let output = document.getElementById("output");
  let actions = document.getElementById("actions");
  let message = document.getElementById("msg");

  socket.on("connect", function () {
    document.querySelector("button").onclick = function () {
      const valormsg = message.value;
      socket.emit("chat:message", { message: valormsg, user: user });
    };
  });

  message.addEventListener("keypress", function () {
    socket.emit("chat:type", user);
  });

  socket.on("chat:message", function (data) {
    actions.innerHTML = "";
    output.innerHTML += `<p> <strong>${data.user}</strong>: ${data.message}</p>`;
  });

  socket.on("chat:type", function (data) {
    actions.innerHTML = `<p> <em>${data} is typing a message. </em> </p>`;
  });

  socket.on("room");
});
