function render() {
  return $(`<li><a href=""><img src=${this.image.medium} /></a><p>${this.name}</p></li>`);
}

$(function() {
  let shows = null;
  fetch("http://api.tvmaze.com/shows")
  .then(response => response.json())
  .then(data => {shows = data}).then(appendListItems);

  function appendListItems() {
    shows.forEach(function(showObj) {
      //const show = new Show(showObj.show.id, showObj.show.image.medium, showObj.show.name);
      const li = render.call(showObj);
      $("#shows").append(li);
    });
  }

  //fetch all favorite shows from the rails API and store it in a variable
  //loop over it and convet them to objects.
  //find the input field, listen for the keyboard event.
  //If keyup event is triggered, delete all the child nodes and render with proper shows

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

});
