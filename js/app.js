$(document).ready(function(){
  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
    console.log(searchTerm);
  });
});

function getRequest(searchTerm){
  var params = {
    q: searchTerm,
    r: 'json',
    part: "snippet",
    key: "AIzaSyD9wxv7MzUhEGVhywAsepSitP1CRIWS-3k"
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    var tNails = [];
    var vidId = [];
    for (i=0;i<data.items.length;i++) {
    if (data.items[i].id.kind == "youtube#video") {
      tNails.push(data.items[i].snippet.thumbnails.default.url);
      vidId.push(data.items[i].id.videoId);
    }
    
   }
    console.log(tNails);
    console.log(vidId);
    showResults(tNails, vidId);
  });
}

function showResults(results, vidId){
  var html = "";
  $.each(results, function(index,value){
    html += '<a href="https://www.youtube.com/watch?v='+ vidId +'">'+'<img id="resultpics" src="' + value + '">' + '</img></a>';
    console.log(value.Title);
  });
  $('#search-results').html(html);
}