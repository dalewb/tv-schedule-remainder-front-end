const myshows_page_template = `<h3>Search Your Shows</h3>
<a href="show-page.html">show-page</a>
<input id= "show-search-field" type="text" />
<button id="show-search-btn">Search</button>
<button id="transfer">transfers</button>
<ul id="shows"></ul>`

const show_page_template = `
<h1 id="show-heading"></h1>
    <div id="seasons">

    </div>`


const search_page_for_new_shows_template = `
<h2 class="text-center">Search by Title</h2>

<div class="col-lg-12">
  <div class="input-group">
      <input type="text" class="form-control" id="show-search-field" placeholder="Search by Title">
      <span class="input-group-btn">
        <button class="btn btn-primary" type="button" id="show-search-btn">Search</button>
      </span>
  </div>
</div>

<br><br>
<div class="album text-muted">
  <div class="container">
      <div class="row" id="search_results">
      </div>
  </div>
</div>
`

const home_page_template = `          <h1 class="text-center"></h1>

<h2 id="schedule_week_of">My schedule for the week of:
<br>${Time.prototype.getWeekOf().toLocaleDateString()} </h2>
<div id="table_settings">
  <form>
    <div class="form-group row">
      <div class="col-2">
        <label for="start_time">Start time:</label>
        <select class="form-control" id="start_time">
          <option>12:00 AM</option>
          <option>12:30 AM</option>
          <option>1:00 AM</option>
          <option>1:30 AM</option>
          <option>2:00 AM</option>
          <option>2:30 AM</option>
          <option>3:00 AM</option>
          <option>3:30 AM</option>
          <option>4:00 AM</option>
          <option>4:30 AM</option>
          <option>5:00 AM</option>
          <option>5:30 AM</option>
          <option>6:00 AM</option>
          <option>6:30 AM</option>
          <option>7:00 AM</option>
          <option>7:30 AM</option>
          <option>8:00 AM</option>
          <option>8:30 AM</option>
          <option>9:00 AM</option>
          <option>9:30 AM</option>
          <option>10:00 AM</option>
          <option>10:30 AM</option>
          <option>11:00 AM</option>
          <option>11:30 AM</option>
          <option>12:00 PM</option>
          <option>12:30 PM</option>
          <option>1:00 PM</option>
          <option>1:30 PM</option>
          <option>2:00 PM</option>
          <option>2:30 PM</option>
          <option>3:00 PM</option>
          <option>3:30 PM</option>
          <option>4:00 PM</option>
          <option>4:30 PM</option>
          <option>5:00 PM</option>
          <option>5:30 PM</option>
          <option>6:00 PM</option>
          <option>6:30 PM</option>
          <option>7:00 PM</option>
          <option>7:30 PM</option>
          <option>8:00 PM</option>
          <option>8:30 PM</option>
          <option>9:00 PM</option>
          <option>9:30 PM</option>
          <option>10:00 PM</option>
          <option>10:30 PM</option>
          <option>11:00 PM</option>
          <option>11:30 PM</option>
        </select>
      </div>

      <div class="col-2">
        <label for="end_time">End time:</label>
        <select class="form-control" id="end_time">
          <option>12:00 AM</option>
          <option>12:30 AM</option>
          <option>1:00 AM</option>
          <option>1:30 AM</option>
          <option>2:00 AM</option>
          <option>2:30 AM</option>
          <option>3:00 AM</option>
          <option>3:30 AM</option>
          <option>4:00 AM</option>
          <option>4:30 AM</option>
          <option>5:00 AM</option>
          <option>5:30 AM</option>
          <option>6:00 AM</option>
          <option>6:30 AM</option>
          <option>7:00 AM</option>
          <option>7:30 AM</option>
          <option>8:00 AM</option>
          <option>8:30 AM</option>
          <option>9:00 AM</option>
          <option>9:30 AM</option>
          <option>10:00 AM</option>
          <option>10:30 AM</option>
          <option>11:00 AM</option>
          <option>11:30 AM</option>
          <option>12:00 PM</option>
          <option>12:30 PM</option>
          <option>1:00 PM</option>
          <option>1:30 PM</option>
          <option>2:00 PM</option>
          <option>2:30 PM</option>
          <option>3:00 PM</option>
          <option>3:30 PM</option>
          <option>4:00 PM</option>
          <option>4:30 PM</option>
          <option>5:00 PM</option>
          <option>5:30 PM</option>
          <option>6:00 PM</option>
          <option>6:30 PM</option>
          <option>7:00 PM</option>
          <option>7:30 PM</option>
          <option>8:00 PM</option>
          <option>8:30 PM</option>
          <option>9:00 PM</option>
          <option>9:30 PM</option>
          <option>10:00 PM</option>
          <option>10:30 PM</option>
          <option>11:00 PM</option>
          <option>11:30 PM</option>
        </select>
      </div>
    </div>
  </form>
</div>

<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th></th>
        <th class="text-center">Sunday</thcl>
        <th class="text-center">Monday</th>
        <th class="text-center">Tuesday</th>
        <th class="text-center">Wednesday</th>
        <th class="text-center">Thursday</th>
        <th class="text-center">Friday</th>
        <th class="text-center">Saturday</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>`
