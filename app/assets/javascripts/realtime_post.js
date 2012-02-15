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
display_error('Le message doit etre compris entre 1 et 140 caracteres');
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

function time_ago_in_words(from) {
   return distance_of_time_in_words(new Date().getTime(), from)
  }

  function distance_of_time_in_words(to, from) {
    seconds_ago = ((to  - from) / 1000);
    minutes_ago = Math.floor(seconds_ago / 60)

    if(minutes_ago == 0) { return "less than a minute";}
    if(minutes_ago == 1) { return "a minute";}
    if(minutes_ago < 45) { return minutes_ago + " minutes";}
    if(minutes_ago < 90) { return " about 1 hour";}
    hours_ago  = Math.round(minutes_ago / 60);
    if(minutes_ago < 1440) { return "about " + hours_ago + " hours";}
    if(minutes_ago < 2880) { return "1 day";}
    days_ago  = Math.round(minutes_ago / 1440);
    if(minutes_ago < 43200) { return days_ago + " days";}
    if(minutes_ago < 86400) { return "about 1 month";}
    months_ago  = Math.round(minutes_ago / 43200);
    if(minutes_ago < 525960) { return months_ago + " months";}
    if(minutes_ago < 1051920) { return "about 1 year";}
    years_ago  = Math.round(minutes_ago / 525960);
    return "over " + years_ago + " years"
  }

$('#realtime_count').click(display_realtime_tweets);
$('#submit_message').click(function() {
send_tweet($('#txt_message').val(), $('input[name$="authenticity_token"]').val());
return false;
});
