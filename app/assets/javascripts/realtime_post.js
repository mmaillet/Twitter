var socket = io.connect('http://localhost:1188');

socket.on('realtime_post', function (data)
{
	realtime_post_add(data);
}

function sendPost(message, token)
{
	hide.error();
	$.post('http://localhost:3000/posts',
	{
		message: message, authenticity_token: token
	}, function(data)
	{
		$('#txt_message').val('');
		socket.emit('post', data);
	}).error(function()
	{
		display_error('The message length must be between 1 and 140');
	});
}

var postRealTime = new Array();

function realtime_post_add(post)
{
	postRealTime.push(post);
	var div realtime = $('#realtime_count');
	div realtime.html(postRealTime.length + " new post(s)");
	div realtime.fadeIn();
}

function display_realtime_posts()
{
$('#realtime_count').fadeOut();
$('#realtime_count').html('');

$.each(postRealTime, function() {
var div_realtime = $('#posts');
div_realtime.prepend(create_post(this)).hide().slideDown();

});

postRealTime = new Array();
}

function create_post(post)
{
return '<div class="post">' +
'<p>' +
'<a href="/posts/' + post.user.username + '" class="post_username">' + post.user.username + '</a>' +
'<br />' +
post.message +
'</p>' +
'<p class="posted_date">' + post.created_at + '</p>' +
'</div>';
}

function display_error(error)
{
$('#errors').html(error);
$('#errors').fadeIn();
}

function hide_error()
{
$('#errors').html('');
$('#errors').fadeOut();
}

$('#realtime_count').click(display_realtime_posts);
$('#submit_message').click(function() {
send_post($('#txt_message').val(), $('meta[name=csrf-token]').attr('content'));
return false;
});

)