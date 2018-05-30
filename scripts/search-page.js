//This function is called on the object.
function render() {
  return $(`<li><a href=""><img src=${this.image.medium} /></a><p>${this.name}</p></li>`);
}

$(function() {
  //This shows variable will be reset once the data has been successfully received.
  let shows = null;
  //we fetch the shows from the Rails API
  fetch("http://api.tvmaze.com/shows")
  .then(response => response.json())
  .then(data => {shows = data}).then(appendListItems);

  //create list items based on the returned data
  function appendListItems() {
    shows.forEach(function(showObj) {
      //const show = new Show(showObj.show.id, showObj.show.image.medium, showObj.show.name);
      const li = render.call(showObj);
      $("#shows").append(li);
    });
  }

  //On keyup event, remove all the children of the #shows and get the input
  //Using the input, check whether the input is a substring of the show name.
  //If it is, then call the render method to make a list item and append it
  //to the shows
  $("#show-search-field").on("keyup", function(event) {
    $("#shows").children("li").remove();
    const input = $("#show-search-field").val().toLowerCase();

    shows.forEach(function(showObj) {
      if(showObj.name.toLowerCase().indexOf(input) !== -1) {
        const li = render.call(showObj);
        $("#shows").append(li);
      }
    });
  });

  localStorage.setItem("lastname", "smith");
});
