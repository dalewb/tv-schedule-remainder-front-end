$(function() {
  showId = null;
  show = null;
  seasons = {};

  if(localStorage.getItem("pageIcameFrom") === "newShowPage") {
    const showName = localStorage.getItem("showTitle");
    $("#show-heading").text(showName)

    localStorage.clear();

    $("#show-heading").after($(`<button id="favorite-btn">Add to favorites</button>`));

    fetch(`http://api.tvmaze.com/search/shows?q=${showName}`)
    .then(response => response.json())
    .then(data => {show = data[0]; getShowId(data);});

    function getShowId(data) {
      showId = data[0].show.id;
      getSeasonsAndEpisodes(showId);
    }

    function getSeasonsAndEpisodes(showId) {
      fetch(`https://api.tvmaze.com/shows/${showId}/seasons`)
      .then(response => response.json())
      .then(data => createSeasonLists(data))
      fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then(response => response.json())
      .then(data => createEpisodeLists(data));
    }
  }

  $("#favorite-btn").on("click", function(event) {
    //MAKE A POST REQUEST TO the backend.
    // debugger;
    $("#favorite-btn").prop('disabled', true);
  });

  //On mouseenter, slide down all the list items under the unorderedList
  $("#seasons").on("mouseenter", "h3", function(event) {
    $(this).closest(".season").find("ul").slideToggle();
    // $("#Quantico-season-2-episodes").slideToggle();
     //debugger;
     //this.closest(".season").find("ul").slideToggle();
  });

});

function createSeasonLists(data) {
  //debugger;
  data.forEach(function(seasonObj) {
    seasons[`season${seasonObj.number}`] = {isSeasonExistInTheBackend: false, seasonId: null};
    const div = $(`<div class="season"></div>`);
    const heading  = $(`<h3 id="show-${showId}-season-${seasonObj.number}-heading">Season ${seasonObj.number}</h3>`);
    const unorderedList = $(`<ul id="show-${showId}-season-${seasonObj.number}-episodes"></ul>`);
    div.append(heading);
    div.append(unorderedList.hide());
    $("#seasons").append(div);
  });
}

function createEpisodeLists(data) {
  //const noOfSeasons = $("#seasons").children("ul").length;
  //I need to make an unorderedList for each season, id being season-1-episodes
  data.forEach(function(episodeObj) {
    const unorderedList = $(`#show-${showId}-season-${episodeObj.season}-episodes`);
    const listItem = $(`<li id="show-${showId}-season-${episodeObj.season}-episode-${episodeObj.number}">${episodeObj.name} <button id="show-${showId}-season-${episodeObj.season}-episode-${episodeObj.number}-btn" onclick="addEventToBackend(this)">Add</button></li>`);
    unorderedList.append(listItem);
  });
}

function addEventToBackend(obj) {
  if($("#favorite-btn").is(":disabled")) {
    obj.disabled = true;
    const season = obj.id.split("-")[2] + obj.id.split("-")[3];
    const episode = obj.id.split("-")[4] + obj.id.split("-")[5];
    debugger;
    //check to see whether season is already added to the backend.

    //if it is, then just send the event to the backend
    //if it is not, then send both the event and season to the backend
    if(!seasons.season.isSeasonExistInTheBackend) {
      //get the season information and get the episode information and send those information
      //to the Rails API.
      //Add the id to seasons.season.seasonId
      //seasons.season.isSeasonExistInTheBackend = true
    } else {
      //Get the id from the seasons.season.seasonId
      //Get the event information and send that information to the Rails API.
    }

  } else {
    alert("Add the show to favorites before adding the episode");
  }
}
