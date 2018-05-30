document.addEventListener("DOMContentLoaded", (event)=>{
    let table_settings = document.getElementById("table_settings")
    let week_of = document.getElementById("schedule_week_of")

    //Set the day
    week_of.innerHTML += `<br> ${Time.prototype.getWeekOf().toLocaleDateString()}`

    //DYNAMICALLY ALTERING TABLE
    table_settings.addEventListener("change", (e) => {
        let timeObj = new Time
        let start_time = document.getElementById("start_time").value
        let end_time = document.getElementById("end_time").value
        let error_msg = document.getElementById("table_error")
        if (error_msg){
            error_msg.remove()
        }

        if (timeObj.differenceInMinutes(start_time, end_time) < 0) {
            start_time.innerHTML = "12:00 AM"
            end_time.innerHTML = "12:00 AM"
            let tableSettings = document.getElementById("table_settings")
            tableSettings.innerHTML += 
                `<div id="table_error" class="alert alert-danger">
                <strong> ERROR </strong> Your start time must come before your end time.
                </div>`
        }
        let table = document.querySelector(`body > div > div > main > div.table-responsive > table > tbody`)
        table.innerHTML = ""
        table.innerHTML += timeObj.customizeSchedule(start_time, end_time)
    })    
})