document.addEventListener("DOMContentLoaded", (event)=>{
    let table_settings = document.getElementById("table_settings")
    let week_of = document.getElementById("schedule_week_of")

    //Set the day
    function getWeekOf(){
        let today = new Date;
        let weekNum = (function() {
            var onejan = new Date(this.getFullYear(),0,1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
        }).call(today)
        
        return (function(week, year){
            return new Date(year, 0, ((week-1)*7));
        }(weekNum, today.getFullYear()));
    }
    week_of.innerHTML += `<br> ${getWeekOf().toLocaleDateString()}`

    //DYNAMICALLY ALTERING TABLE
    table_settings.addEventListener("change", (e) => {
        let start_time = document.getElementById("start_time").value
        let end_time = document.getElementById("end_time").value
        console.log(start_time, end_time)

        console.log(end_time.value - start_time.value)
    })
    

    
    
})