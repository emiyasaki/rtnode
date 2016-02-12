function handleHTTP(req, res) {
    if (req.method === 'GET') {
        static_files.serve(req, res);
        /*if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
            req.process.addListener('end', function() {
                //req.url = req.url.replace(/^\/(\d+).*$/,"/$)
                static_files.serve(req, res);
            });
            req.resume();
        } else {
            res.writeHead(403);
            res.end("Get outta here");
        }*/
    } else {
        res.writeHead(403);
        res.end("Get outta here");
    }
}

function handleIO(socket) {
    function disconnect() {
        //clearInterval(intvl);
        console.log('Client disconnected');
    }

    console.log('Client connected');
    socket.on('disconnect', disconnect);

    /*var intvl = setInterval(function() {
        socket.emit('hello', Math.random());
    }, 1000);*/

    socket.on('message', function(data){
    	socket.broadcast.emit('messages', data);

    	console.log('Message broadcasted');
    });
}

var host = 'localhost';
var port = 8006;

var http = require('http');
var httpSrv = http.createServer(handleHTTP).listen(port, host);

var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);

var io = require('socket.io').listen(httpSrv);

io.configure(function() {
    io.enable('browser client minification');
    io.enable('browser client etag');
    io.set('log level', 1);
    io.set('transports', [
        'websocket',
        'xhr-polling',
        'jsonp-polling'
    ]);
});

io.on('connection', handleIO);
