from flask import Flask, render_template, url_for, request, jsonify
from flask_socketio import SocketIO, emit
from flask_socketio import join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('chat:message')
def msg(data):
    socketio.emit('chat:message', data)


@socketio.on('chat:type')
def typing(data):
    socketio.emit('chat:type', data, broadcast=True)


if __name__ == "__main__":
    socketio.run(app)
