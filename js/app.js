$(document).ready(function(){
  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
    console.log(searchTerm);
    $("#next-page button").show();
  });

  $("#next-page button").on("click", function() {
    var searchTerm = $('#query').val();
    getRequest(searchTerm, nextPage);
  });
});



function getRequest(searchTerm, token){
  var params = {
    q: searchTerm,
    r: 'json',
    part: "snippet",
    key: "AIzaSyD9wxv7MzUhEGVhywAsepSitP1CRIWS-3k",
    maxResults: 10,
    pageToken: token

  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    var tNails = [];
    var vidId = [];
    var channel = [];
    for (i=0;i<data.items.length;i++) {
    if (data.items[i].id.kind == "youtube#video") {
      tNails.push(data.items[i].snippet.thumbnails.default.url);
      vidId.push(data.items[i].id.videoId);
      channel.push(data.items[i].snippet.channelId);
      nextPage = data.nextPageToken;
      console.log(nextPage);
      showResults(tNails, vidId, channel);
    }
    
   }

    console.log(tNails);
    console.log(vidId);
    console.log(channel);
    console.log(data);
  });
}

function showResults(results, vidId, cId){
  var html = "";
  $.each(results, function(index,value){
    html += '<div class="result-item"><a href="https://www.youtube.com/watch?v='+ vidId[index] +'">'+'<img id="resultpics" src="' + value + '">' + '</a>' + '<a href="https://www.youtube.com/channel/' + cId[index] + '">Click Here for More From This Channel</a></div>';
  });
  $('#search-results').html(html);
}