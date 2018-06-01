//LINE 166
function loadShowPageJS(){
  let showId = null;
  $(function() {
    showIdDuplicate = null;
    show = null;
    seasons = {};
    // seasonIdNum = null;

    if(localStorage.getItem("pageIcameFrom") === "newShowPage") {
      const showName = localStorage.getItem("showTitle");
      $("#show-heading").text(showName)

      localStorage.clear();

      $("#show-heading").after($(`<button id="favorite-btn">Add to favorites</button>`));

      fetch(`http://api.tvmaze.com/search/shows?q=${showName}`)
      .then(response => response.json())
      .then(data => {show = data[0]; getShowId(data);});

      function getShowId(data) {
        //debugger;
        showId = data[0].show.id;
        // debugger;
        showIdDuplicate = data[0].show.id;
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

    $("#favorite-btn").on("click", (event) => {
      //MAKE A POST REQUEST TO the backend.
      $("#favorite-btn").prop('disabled', true);
      // fetch(`https://api.tvmaze.com/shows/${showId}/cast`)
      // .then(response => response.json())
      // .then(data => )

      config = {
        method: "POST",
        headers: {
        "content-type": "application/json"
      },
        body: JSON.stringify({
          title: show.show.name,
          description: show.show.summary,
          img_url: show.show.image.medium,
          cast: null,
          rating: `${show.score}`,
        })
      }
      fetch("http://localhost:3000/api/v1/shows", config)
      .then(response => response.json())
      .then(data => {
        //debugger
        showId = data.id
        console.log("changing showid");
        console.log("showId is", showId);
        console.log("-------");
      });
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
      const listItem = $(`<li id="show-${showId}-season-${episodeObj.season}-episode-${episodeObj.number}">${episodeObj.name} ${episodeObj.airtime}<button id="show-${showId}-season-${episodeObj.season}-episode-${episodeObj.number}-btn">Add</button></li>`);
      unorderedList.append(listItem);
    });

    const seasonsContainer = document.getElementById("seasons");
    seasonsContainer.addEventListener("click", function(event) {
      if(event.target.nodeName && event.target !== null) {
        addEventToBackend(event.target);
      }
    });
  }

  function addEventToBackend(obj) {
    if($("#favorite-btn").is(":disabled")) {
      obj.disabled = true;
      const seasonNum = Number.parseInt(obj.id.split("-")[3]);
      const episodeNum = Number.parseInt(obj.id.split("-")[5]);
      const season = obj.id.split("-")[2] + obj.id.split("-")[3];
      const episode = obj.id.split("-")[4] + obj.id.split("-")[5];
      //check to see whether season is already added to the backend.

      //if it is, then just send the event to the backend
      //if it is not, then send both the event and season to the backend
      if(!seasons[season].isSeasonExistInTheBackend) {
        console.log("inside conditional");
        console.log("showId is", showId);
        console.log("----");
        //get the season information and get the episode information and send those information
        //to the Rails API.
        //get the season information
        //debugger
        fetch(`http://api.tvmaze.com/shows/${showIdDuplicate}/seasons`)
        .then(response => response.json())
        .then(data => getSeasonInformation(data, seasonNum, episodeNum))
        //.then(fetchEpisodes(episodeNum, seasons[`season${seasonNum}`].seasonId));
        //Add the id to seasons.season.seasonId
        //seasons.season.isSeasonExistInTheBackend = true
      } else {
        //Get the id from the seasons.season.seasonId
        //Get the episode information and send that information to the Rails API.
      }

    } else {
      alert("Add the show to favorites before adding the episode");
    }
  }

  function getSeasonInformation(data, seasonNum, episodeNum) {

    const season = data.filter(function(seasonObj) {
      return seasonObj.number === seasonNum;
    });

    addSeasonToBackend(season[0], seasonNum, episodeNum);
  }

  function addSeasonToBackend(season, seasonNum, episodeNum) {
    // let seasonIdNum = null;
    const config = {
      method: "POST",
      headers: {
      "content-type": "application/json"
    },
      body: JSON.stringify({
        "show_id": showId,
        "air_date": season.premiereDate
      })
    }

    fetch("http://localhost:3000/api/v1/seasons", config)
    .then(response => response.json())
    .then(data => {setSeasonId(episodeNum, seasonNum, data.id)})//seasonIdNum = data.id
    // .then(seasons[`season${seasonNum}`].isSeasonExistInTheBackend = true)
    // .then(seasons[`season${seasonNum}`].seasonId = seasonIdNum)
    // //.then(fetchEpisodes(episodeNum, seasons[`season${seasonNum}`].seasonId));
  }

  function setSeasonId(episodeNum, seasonNum, seasonId) {
    //console.log(season, seasonNum, episodeNum);
    seasons[`season${seasonNum}`].isSeasonExistInTheBackend = false;
    seasons[`season${seasonNum}`].seasonId = seasonId;
    fetchEpisodes(episodeNum, seasonNum)
  }

  function fetchEpisodes(episodeNum, seasonNum) {
    fetch(`http://api.tvmaze.com/shows/${showIdDuplicate}/episodes`)
    .then(response => response.json())
    .then(data => getEpisodeInformation(data, episodeNum, seasonNum));
  }

  function getEpisodeInformation(data, episodeNum, seasonNum) {
    const episode = data.filter(function(episodeObj) {
      return episodeObj.number === episodeNum && seasonNum === episodeObj.season;
    });

    addEpisodeToBackend(episode[0], seasonNum);
  }

  function addEpisodeToBackend(episode, seasonNum) {
      // debugger;
    newTime = null;
    if(Number.parseInt(episode.airtime.split(":")[0]) > 12) {
      const newHour = Number.parseInt(episode.airtime.split(":")[0]) - 12;
      const minute =  `${Number.parseInt(episode.airtime.split(":")[1])}0`;
      const newMin = minute.split(3)[0];
      newTime = `${newHour}:${newMin} PM`;
    } else {
      const newHour = Number.parseInt(episode.airtime.split(":")[0]);
      const minute =  `${Number.parseInt(episode.airtime.split(":")[1])}0`;
      const newMin = minute.split(3)[0];
      newTime = `${newHour}:${newMin} AM`;
    }

    const config = {
      method: "POST",
      headers: {
      "content-type": "application/json"
    },
      body: JSON.stringify({
        title: episode.name,
        description: episode.summary,
        img_url: episode.image,
        view_time: newTime,
        season_id: seasonNum,
        release_date: episode.air_date
      })
    }

    fetch("http://localhost:3000/api/v1/episodes", config)
    // .then(response => response.json())
    // .then(data => {});
  }

}
