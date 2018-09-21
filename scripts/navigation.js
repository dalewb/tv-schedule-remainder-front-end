document.addEventListener("DOMContentLoaded", (event)=>{
    let main_container = document.getElementById("main_container")
    main_container.innerHTML = home_page_template
    loadHomePageJS()

    //RENDER SEARCH PAGE
    let search_button = document.getElementById("search")
    search_button.addEventListener("click", (e) => {
        main_container.innerHTML = search_page_for_new_shows_template
        loadSearchJS()
    })

    //MYSHOWS PAGE
    let myshows_button = document.getElementById("myshows_button")
    myshows_button.addEventListener("click", (e)=>{
        main_container.innerHTML = myshows_page_template
        loadMyShows()
    })

    //RENDER HOME PAGE
    let home_button = document.getElementById("home_button")
    home_button.addEventListener("click", (e) => {
        main_container.innerHTML = home_page_template
        loadHomePageJS()
    })

    //RENDER SHOW PAGE FOR RESULTS IS IN SEARCH PAGE FOR NEW SHOWS.JS
    
})