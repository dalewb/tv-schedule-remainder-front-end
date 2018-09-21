function loadHomePageJS(){

    let table_settings = document.getElementById("table_settings")
    let week_of = document.getElementById("schedule_week_of")

    //DYNAMICALLY ALTERING TABLE
    table_settings.addEventListener("change", (e) => {
        let time_obj = new Time
        let start_time = document.getElementById("start_time").value
        let end_time = document.getElementById("end_time").value
        let error_msg = document.getElementById("table_error")
        let table = document.querySelector(`body > div > div > main > div.table-responsive > table > tbody`)

        if (time_obj.differenceInMinutes(start_time, end_time) < 0) {
            // debugger;
            let table_settings = document.getElementById("table_settings")
            let error = document.createElement("div")
            error.setAttribute("id", "table_error")
            error.innerHTML =
                `<div id="table_error" class="alert alert-danger">
                <strong> ERROR </strong> Your start time must come before your end time.
                </div>`;
            table_settings.appendChild(error)
            table.innerHTML = ""
        } else {
            if (error_msg){
                error_msg.remove()
            }
            table.innerHTML = ""
            table.innerHTML += time_obj.customizeSchedule(start_time, end_time)
        }

        function renderSortedEpisode(episodes) {

          episodes.forEach(episode => {
            let dayNum = 1
            let stringTime = episode.view_time.split(' ')[0]
            let amPm = episode.view_time.split(' ')[1]
            let intTime = parseInt(stringTime)
            if (parseInt(stringTime) == 0) {
              stringTime = '12:00'
              amPm = 'AM'
            }
            let pText = `<p><strong>${episode.title}</strong></p>`
            let strong = document.createElement('strong')
            strong.innerText = episode.title
            let pTitle = document.createElement('p')
            pTitle.append(strong)

            let pSpace = document.createElement('p')
            let img = document.createElement('img')
            img.setAttribute('src', `${episode.img_url}`)
            img.setAttribute("height", "118px")
            img.setAttribute("width", "84px")
            pSpace.append(img)
            pSpace.append(pTitle)
            space = document.getElementById(`${stringTime}_${amPm}_1`)
            if (space && space.children.length == 0) {
              space.append(pSpace)
            } else if (space) {
              while (space.children.length > 0) {
                space = document.getElementById(`${stringTime}_${amPm}_${dayNum}`)
                dayNum += 1
              }
              space.append(pSpace)
            }
          })
        }

        function sortEpisodesByTime(episodes) {
          let sorted = episodes.sort(function(a,b){
            return parseInt(a.view_time) - parseInt(b.view_time);
          })
          return sorted
        }

        function sortByAmAndPm(episodes) {
          let am = episodes.filter(function(ep) {
            return ep.view_time.toLowerCase().includes("am")
          })
          let pm = episodes.filter(function(ep) {
            return ep.view_time.toLowerCase().includes("pm")
          })
          let sortedAm = sortEpisodesByTime(am)
          let sortedPm = sortEpisodesByTime(pm)
          let sortedAll =  sortedAm.concat(sortedPm)

          renderSortedEpisode(sortedAll)
        }

        fetch("http://localhost:3000/api/v1/users/1/episodes")
          .then(res => res.json())
          .then(json => sortByAmAndPm(json))
    })
}
