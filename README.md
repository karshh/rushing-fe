# TSI "the Rush" Challenge

The purpose of this web app is to visualize rushing data in a sortable, filterable paginated table. See
* [Backend Project](https://github.com/karshh/rushing-be)

### Installation and running the application

First, let's get some configuration out of the way:

- Clone this repository.
- Update `backendURL` in `src/environments/environment.ts` to point to the backend service. The committed code is defaulted to `http://localhost:5000`
- Update the `target`  in `proxy.conf.json` to point to the backend service. This allows our angular project to enable CORS for this endpoint. The committed code is defaulted to `http://localhost:5000`. 

The following 2 ways can be used to run the application in development.

**1. Using npm**
- Run `npm install`
- Once all depedencies are installed, run `npm run dev-start`. This runs the project with a watch by default.

**2. Using docker**
- Run `docker-compose build`
- Once the image is built, run `docker-compose up`
- To run the above two commands together, run `docker-compose up --build`

### Using the app.

The visualization consists of a table representing football players' rushing statistics with the following attraibutes:

* `Player` (Player's name)
* `Team` (Player's team abbreviation)
* `Pos` (Player's postion)
* `Att/G` (Rushing Attempts Per Game Average)
* `Att` (Rushing Attempts)
* `Yds` (Total Rushing Yards)
* `Avg` (Rushing Average Yards Per Attempt)
* `Yds/G` (Rushing Yards Per Game)
* `TD` (Total Rushing Touchdowns)
* `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
* `1st` (Rushing First Downs)
* `1st%` (Rushing First Down Percentage)
* `20+` (Rushing 20+ Yards Each)
* `40+` (Rushing 40+ Yards Each)
* `FUM` (Rushing Fumbles)

Notes about the following
- The table is paginated with 10 records per page. 
- The table is sortable _Player_,  _Yds_, _Lng_ and _TD_. By default, the table is sorted by _Player_.
- The table is filterable by _Player_.
- The table can be exported using the `Export CSV` button.
- Data can be imported into the table using `Import JSON` button. An example of the JSON structure can be found [here](https://raw.githubusercontent.com/tsicareers/nfl-rushing/master/rushing.json).

### Deployment
Make sure to update `backendURL` in `src/environments/environment.prod.ts` to point to the backend service.
For the purpose of demonstration, this project is deployed in heroku at the moment at https://tsi-karsh-frontend.herokuapp.com/. 

**1. Static distribution files**

Run `npm run build`. this will create a `dist/` folder which should contain artifacts, which can then be deployed for purposes of production to a server of your choice.

**2. Heroku**

Install Heroku CLI and log in using the command ```heroku login```

Create your heroku project.
```
heroku create app-name
```
Once done, push the code to heroku.
```
git push heroku master
```
