
var newHTml ;

$(function () {
	var socket = io();
	$('form').submit(function(){
	newHtml = "<li class =\"list-group-item\">" +"You : " + $("input[type = 'text']").val() + "</li>";
	$('ul').prepend(newHtml);
	socket.emit('chat message', $('#msg').val());
	$('#msg').val('');
	socket.on('reply', function(reply){
	    newHtml = "<li class =\"list-group-item backColor\">" + reply + "</li>";
	    console.log(newHtml);
	 	$('ul').prepend(newHtml);
	});
	return false;
	});
});
