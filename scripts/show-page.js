$(function() {
  //Let us assume that Quantico was clicked in the search page
  //The information is going to come through the local storage in JSON format.
  //Let assume it came through like this:
  const show = {id: 2114, image: "http://static.tvmaze.com/uploads/images/medium_portrait/152/380653.jpgname", name: "Quantico"};
  $("#show-heading").text(show.name);

  fetch("https://api.tvmaze.com/shows/2114/seasons")
  .then(response => response.json())
  .then(data => createSeasonLists(data))
  .then(fetch("https://api.tvmaze.com/shows/2114/episodes")
  .then(response => response.json())
  .then(data => createEpisodeLists(data)));

  function createSeasonLists(data) {
    data.forEach(function(seasonObj) {
      const unorderedList = $(`<ul id="${show.name}-season-${seasonObj.number}-episodes">Season ${seasonObj.number}</ul>`);
      $("#seasons").append(unorderedList.hide());

    });
  }

  function createEpisodeLists(data) {
    const noOfSeasons = $("#seasons").children("ul").length;
    //I need to make an unorderedList for each season, id being season-1-episodes
    data.forEach(function(episodeObj) {
      const unorderedList = $(`#${show.name}-season-${episodeObj.season}-episodes`);
      const listItem = $(`<li id="${show.name}-season-${episodeObj.season}-episode-${episodeObj.number}">${episodeObj.name}</li>`);
      unorderedList.append(listItem);
    });
  }

  // $("#seasons").on("mouseenter", "ul", function(event) {
  //   debugger;
  //   $(`#${this.target.id}`).children("li").each(function(id, ele) {
  //     ele.text();
  //   })
  // });

  $("#show-episodes-btn").on("click", function() {
    $("#Quantico-season-1-episodes").slideToggle();
  });
});
