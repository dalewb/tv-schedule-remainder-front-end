// commit test no. 2
//This function is called on the object.
function loadSearchJS(){

  function render() {
    // debugger;
    return $(`
    <div class="card" style="margin: 5px;">
      <img class="img-fluid" alt="Thumbnail [100%x280]" style="height: 280px; width: 100%; display: block;" src="${this.show.image.medium}" data-holder-rendered="true">
      <h5 class="card-text text-center" style="color:#464040; padding:10px;">${this.show.name}</h5>
    </div>`
    );
  }
    // <li><a onmouseover="myFunc(this)" href="../pages/show-page.html"><img src=${this.show.image.medium} /><p>${this.show.name}</p></a></li>
  
  function myFunc() {
    localStorage.setItem("pageIcameFrom", "newShowPage");
    localStorage.setItem("showTitle", this.innerText);
  }

  // $("#transfer").on("click", function() {
  //   window.location.href = "../pages/show-page.html";
  // })
  
  $("#main_container > div.album.text-muted").click((event) =>{
    if (event.target.parentElement.className === "card"){
      myFunc.call(event.target.parentElement.children[1])
      
      let main_container = document.getElementById("main_container")
      main_container.innerHTML = show_page_template
      loadShowPageJS();
    }
  })


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

      fetch("http://api.tvmaze.com/shows")
      .then(response => response.json())
      .then(data => {shows = data})//.then(appendListItems);

      //create list items based on the returned data
      function appendListItems() {
        shows.forEach(function(showObj) {
          //const show = new Show(showObj.show.id, showObj.show.image.medium, showObj.show.name);
          const showCard = render.call(showObj);
          $("#search_results").append(showCard);
        });
      }

      //On keyup event, remove all the children of the #shows and get the input
      //Using the input, check whether the input is a substring of the show name.
      //If it is, then call the render method to make a list item and append it
      //to the shows
      $("#show-search-btn").on("click", function(event) {
        $("#search_results").children().remove();

        const input = $("#show-search-field").val().toLowerCase();

        fetch(`http://api.tvmaze.com/search/shows?q=${input}`)
        .then(response => response.json())
        .then(data => {
          addTheShowsToDOM(data)
          if (!$("search_results").children()[0]){
            if ($("search_warning") || $("#search_error")){
              $("#search_error").remove()
              $("#search_warning").remove()
            }
            let warning = document.createElement("div")
            warning.innerHTML =`<div id="search_warning" class="alert alert-warning">
            <strong> WARNING </strong> No results found.
            </div>`;
            $("#main_container > div.album.text-muted").prepend(warning)
          }

          $(".card").hover(console.log("on mouse"), console.log("out of mouse"))
        });

        function addTheShowsToDOM(shows) {
          //debugger
          shows.forEach(function(showObj) {
            if(showObj.show.name.toLowerCase().indexOf(input) !== -1) {
              const showCard = render.call(showObj);
              $("#search_results").append(showCard);
            }
          });
        }
      });
    })
  }
