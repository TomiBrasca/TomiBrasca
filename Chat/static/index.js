var user = localStorage.getItem("username");
if (User == null) {
  localStorage.setItem("username", window.prompt("Please input your name"));
  user = localStorage.getItem("username");
} else {
  alert("Hello " + User);
}
document.addEventListener("DOMContentLoaded", () => {
  // Connect to websocket
  var socket = io.connect(
    location.protocol + "//" + document.domain + ":" + location.port
  );

  socket.on("connect", () => {
    document.querySelector("button").onclick = function() {
      const selection = document.getElementById("inp").value;
      const room = document.getElementById("room").value;
      socket.emit("join", { selection: selection, room : room, user : user });
    };
  });

  socket.on("show msg", data => {
    const li = document.createElement("li");
    li.innerHTML = `${User}: ${data.selection}`;
    document.getElementById("gen").append(li);
  });
});
