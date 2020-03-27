from flask import Flask, render_template, url_for, request, jsonify
from flask_socketio import SocketIO, emit
from flask_socketio import join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

TomiPuto
@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('submit msg')
def msg(data):
    selection = data["selection"]
    emit("show msg", {"selection": selection}, broadcast=True)


# @socketio.on('join')
# def on_join(data):
#    username = data['username']
#    room = data['room']
#    join_room(room)
#    send(username + ' has entered the room.', room=room)


# @socketio.on('leave')
# def on_leave(data):
#    username = data['username']
#    room = data['room']
#    leave_room(room)
#    send(username + ' has left the room.', room=room)
