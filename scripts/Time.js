const clock = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"]

class Time {
    getWeekOf(){
        let today = new Date;
        let weekNum = (function() {
            var onejan = new Date(this.getFullYear(),0,1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
        }).call(today)
        
        return (function(week, year){
            return new Date(year, 0, ((week-1)*7));
        }(weekNum, today.getFullYear()));
    }

    parseHHMMAA(timeStr){
        let splitTime = timeStr.split(':')
        let ampm = splitTime[1].split(' ')[1]
        splitTime[1] = splitTime[1].split(' ')[0]
        let [hour, min] = splitTime
        return {hh: hour, mm: min, aa: ampm}
    }

    timeTo24HH(time){
        switch (time.aa) {
            case `AM`:
                if (time.hh === `12`){ 
                    time.hh = `00`
                } else {
                    time.hh = `${parseInt(time.hh)}`
                }
            break;
            case `PM`:
                if (time.hh === `12`){
                    break;
                } else {
                    time.hh = `${parseInt(time.hh) + 12}`
                }
            break;
        }
        return time
    }

    timeToAMPM(time){
        if (parseInt(time.hh) > 12){ 
            time.hh = `${parseInt(time.hh) - 12}`
            time.aa = `PM`
        } else if (parseInt(time.hh) === 0) {
            time.hh = `12`
            time.aa = `AM`
        } else if (parseInt(time.hh) === 12) {
            time.aa = `PM`
        }
        return time
    }

    stringToMins(timeStr){
        let time = this.parseHHMMAA(timeStr)
        let twentyFourTime = this.timeTo24HH(time)
        twentyFourTime.hh = (`${parseInt(twentyFourTime.hh) * 60}`)
        return parseInt(twentyFourTime.hh) + parseInt(twentyFourTime.mm)
    }

// let date = new Date(2018, 12, 09, hour, min)
// return date.toLocaleTimeString()

    differenceInMinutes(start, end){
        return this.stringToMins(end) - this.stringToMins(start)
    }

    stringifyTime(time){
        let strTime = {}
        strTime.hh = (time.hh).toString()
        strTime.mm = (time.mm).toString()
        strTime.aa = time.aa
        return strTime
    }

    customizeSchedule(start, end){
        let difference = this.differenceInMinutes(start,end)
        let intervals = difference/30

        let time = this.parseHHMMAA(start)
        let twentyFourHourTime
        let allRows = ""
        
        for (let i=0; i < intervals + 1; i++){
            allRows += this.renderRows(time);
            twentyFourHourTime = this.timeTo24HH(time)
            // debugger;
            if (i === 0 && parseInt(twentyFourHourTime.mm) === 0) {
                twentyFourHourTime.mm = `${parseInt(twentyFourHourTime.mm) + 30}`
            }
            else if (time.mm === "30") {
                twentyFourHourTime.hh = `${parseInt(twentyFourHourTime.hh)+ 1}`
                twentyFourHourTime.mm = "00"
            }
            else if (time.mm === "00") {
                twentyFourHourTime.mm = "30"
            }
            time = this.timeToAMPM(time)
        }
        return allRows
    }
    
// let date = new Date(2018, 12, 09, hour, min)
// return date.toLocaleTimeString()
    renderRows(time){
        // return console.log(`rendered ${time.hh}:${time.mm} ${time.aa}`);
        return `<tr>
        <td class="text-right">${time.hh}:${time.mm} ${time.aa}</td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
      </tr>`
    }
}