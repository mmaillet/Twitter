var socket = io.connect('http://localhost:1188');

socket.on('realtime_post', function (data) {
realtime_tweet_add(data);
});

function send_tweet(tweet_message, token)
{
hide_error();

$.post('http://localhost:3000/posts',
{message: tweet_message, authenticity_token: token},
function(data) {
$('#txt_message').val('');
socket.emit('post', data);
})
.error(function() {
display_error('The post should be between 1 and 140 characters');
});
}


var tweetsRealTime = new Array();

function realtime_tweet_add(tweet)
{
tweetsRealTime.push(tweet);
var div_realtime = $('#realtime_count');
div_realtime.html(tweetsRealTime.length + ' new post(s)');
div_realtime.fadeIn();
}

function display_realtime_tweets()
{
$('#realtime_count').fadeOut();
$('#realtime_count').html('');

$.each(tweetsRealTime, function() {
var div_realtime = $('#realtime_unread_tweets');
div_realtime.prepend(create_tweet(this)).hide().slideDown();

});

tweetsRealTime = new Array();
}

function create_tweet(post)
{
return '<p>' +
'<b>Posted ' + jQuery.timeago(post.created_at) + ' by <a href="/posts/' + post.user.username + '" >' + post.user.username + '</a></b></p>' +  
'<p>' + post.message + '</p>';
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

$('#realtime_count').click(display_realtime_tweets);
$('#submit_message').click(function() {
send_tweet($('#txt_message').val(), $('input[name$="authenticity_token"]').val());
return false;
});
