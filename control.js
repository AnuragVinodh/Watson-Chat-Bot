var express    = require("express");
var app        = express();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var watson     = require('watson-developer-cloud/conversation/v1');


app.set("view engine","ejs");
app.use(express.static(__dirname));

var conversation = new watson({
    username: '84febbae-d91c-4a05-a5ed-e672817e6fbe',
    password: 'DaXhtmZ6CTDR',
    version_date: '2018-02-16'
});

app.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});

    
io.on('connection', function(socket){
	console.log('a user has connected');
  socket.on('chat message', function(msg){


    console.log('message: ' + msg);
    var data;

    conversation.message({
		  workspace_id: '1d3ba061-ec13-437d-a5c3-f25c8f93e6a1',
		    input:  {'text': msg } 
	}, function(err, response) {
		if(err){
		console.log('error',response);
		}else{
		console.log('Watson: ' + response.output.text[0]);
		
		data = response.output.text[0];
		console.log("data  : " + data);
		socket.emit('reply', data)
		}
		});
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
