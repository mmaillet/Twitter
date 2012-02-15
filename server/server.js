var app = require('http').createServer()
	, io = require('socket.io').listen(app)
	, fs = require('fs')
	
app.listen(1188);

io.sockets.on('connection', function (socket)
{
	socket.on('post', function (data)
	{
		console.dir(data);
		socket.emit('realtime_post', data);
		socket.broadcast.emit('realtime_post', data);
	}
	);
}
);