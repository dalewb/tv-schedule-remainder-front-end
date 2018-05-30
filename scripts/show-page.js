$(function() {
  console.log(localStorage.getItem("lastname"));
  //Let us assume that Quantico was clicked in the search page
  //The information is going to come through the local storage in JSON format.
  //Let assume it came through like this:
  const show = {id: 2114, image: "http://static.tvmaze.com/uploads/images/medium_portrait/152/380653.jpgname", name: "Quantico"};
  $("#show-heading").text(show.name);

  //Fetch all the seasons and episodes information from the Rails API because
  //the favorite show must exist in the Rails API. Using the show, we can get all
  //the episodes and seasons because of the Active Record associations.
  fetch("https://api.tvmaze.com/shows/2114/seasons")
  .then(response => response.json())
  .then(data => createSeasonLists(data))
  .then(fetch("https://api.tvmaze.com/shows/2114/episodes")
  .then(response => response.json())
  .then(data => createEpisodeLists(data)));

  //For each season, create a new div element, heading and an unorderedList
  //Append the heading and unorderedList to the div element and append the div
  //to div with id "seasons" Each unorderedList is hidden initially, because we
  //want the functionality of sliding down and sliding up on mouse event.
  function createSeasonLists(data) {
    data.forEach(function(seasonObj) {
      const div = $(`<div class="season"></div>`);
      const heading  = $(`<h3 id="season-${seasonObj.number}-heading">Season ${seasonObj.number}</h3>`);
      const unorderedList = $(`<ul id="${show.name}-season-${seasonObj.number}-episodes"></ul>`);
      div.append(heading);
      div.append(unorderedList.hide());
      $("#seasons").append(div);
    });
  }

  //For each episode, create a new list item with the appropriate information and
  //find the right unorderedList and append it to the list.
  function createEpisodeLists(data) {
    //const noOfSeasons = $("#seasons").children("ul").length;
    //I need to make an unorderedList for each season, id being season-1-episodes
    data.forEach(function(episodeObj) {
      const unorderedList = $(`#${show.name}-season-${episodeObj.season}-episodes`);
      const listItem = $(`<li id="${show.name}-season-${episodeObj.season}-episode-${episodeObj.number}">${episodeObj.name}</li>`);
      unorderedList.append(listItem);
    });
  }

  //On mouseenter, slide down all the list items under the unorderedList
  $("#seasons").on("mouseenter", "h3", function(event) {
     $(`#Quantico-season-${this.id.split("-")[1]}-episodes`).slideToggle();
    // $("#Quantico-season-2-episodes").slideToggle();
    // debugger;
    // this.closest(".season").find("ul").slideToggle();
  });

  // //On mouseleave, slide up all the list items under the unorderedList
  // $("#seasons").on("mouseleave", "h3", function(event) {
  //    $(`#Quantico-season-${this.id.split("-")[1]}-episodes`).slideUp();
  //   // $("#Quantico-season-2-episodes").slideToggle();
  //   // debugger;
  //   // this.closest(".season").find("ul").slideToggle();
  // });
});
