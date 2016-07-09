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
    for (i=0;i<data.items.length;i++) {
    tNails.push(data.items[i].snippet.thumbnails.default.url);
    }
    console.log(tNails);
    showResults(tNails);
  });
}

function showResults(results){
  var html = "";
  $.each(results, function(index,value){
    html += '<img src=">' + value + '"' + '</img>';
    console.log(value.Title);
  });
  $('#search-results').html(html);
}