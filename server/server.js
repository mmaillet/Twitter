var app = require('http').createServer()
	, io = require('socket.io').listen(app)
	, fs = require('fs')
	
app.listen(1188);

io.sockets.on('connection', function (socket)
{
	socket.on('post', function (data)
	{
		socket.emit('reatime post', data);
		socket.broadcast.emit('reatime post', data);
	}
	);
}
);