  //This function is called on the object.
function loadMyShows(){
  function render() {
    return $(`<li><a onmouseover="myFunc(this)" href="../pages/show-page.html"><img src=${this.img_url} /><p>${this.title}</p></a></li>`);
  }

  function myFunc(obj) {
    localStorage.setItem("pageIcameFrom", "newShowPage");
    localStorage.setItem("showTitle", $(obj).children("p").text());

  }

  // $("#transfer").on("click", function() {
  //   window.location.href = "../pages/show-page.html";
  // })
  $(function() {
    //This shows variable will be reset once the data has been successfully received.
    let shows = null;
    //we fetch the shows from the Rails API
    //Show all the shows that belongs to the user in the show page
    //user searches for shows, this will make a GET request to the remote API, even if the show is
    //found in the Rails API. IT WILL SEARCH FOR THE SHOW FROM THE REMOTE API.
    //User sees the results, clicks on the show image gets redirected to the show page
    //If the user adds the show to the their list,
    // --Then we check to see whether the show exist in the Rails API,
    //    --If exists, then associate the user to the show.
    //    --If not, then add the show to the Rails API and associate the user.

    // fetch("http://localhost:3000/api/v1/shows")
    // .then(response => response.json())
    // .then(data => {shows = data})//.then(appendListItems);
    //
    // //create list items based on the returned data
    // function appendListItems() {
    //   shows.forEach(function(showObj) {
    //     //const show = new Show(showObj.show.id, showObj.show.image.medium, showObj.show.name);
    //     const li = render.call(showObj);
    //     $("#shows").append(li);
    //   });
    // }


    function getShowByName(json, name) {
      return json.filter(show => show.title.toLowerCase().includes(name.toLowerCase()))
    }

    function findShowIdFromName(name) {
      return fetch("http://localhost:3000/api/v1/shows")
        .then(res => res.json())
        .then(json => getShowByName(json, name))
    }

    //On keyup event, remove all the children of the #shows and get the input
    //Using the input, check whether the input is a substring of the show name.
    //If it is, then call the render method to make a list item and append it
    //to the shows
    $("#show-search-btn").on("click", function(event) {
      $("#shows").children("li").remove();
      const input = $("#show-search-field").val().toLowerCase();

      findShowIdFromName(input)
      .then(data => addTheShowsToDOM(data))

      // fetch(`http://localhost:3000/shows?q=${input}`)
      // .then(response => response.json())
      // .then(data => {addTheShowsToDOM(data)});

      function addTheShowsToDOM(shows) {
        //debugger
        shows.forEach(function(showObj) {
          // debugger
          // if(showObj.show.name.toLowerCase().indexOf(input) !== -1) {
            const li = render.call(showObj);
            $("#shows").append(li);
          // }
        });
      }
    });
  });
}