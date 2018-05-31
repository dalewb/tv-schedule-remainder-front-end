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

    //RENDER HOME PAGE
    let home_button = document.getElementById("home_button")
    home_button.addEventListener("click", (e) => {
        main_container.innerHTML = home_page_template
        loadHomePageJS()
    })
})