## Setup
- Download Postico
- Create a new postgresql database called 'music-db'
-  `npm install`


## API Endpoints
Create an api with the following endpoints:

- [ ] `/api/songs` GET all songs
- [ ] `/api/songs/id/:id` GET specific song by id   
  - [Express params docs - Read the 'Route Parameters section'](https://expressjs.com/en/guide/routing.html)
  - [Sequelize 'find' docs](http://docs.sequelizejs.com/en/latest/docs/models-usage/#find-search-for-one-specific-element-in-the-database)
  - [Sequelize 'where' docs](http://docs.sequelizejs.com/en/latest/docs/querying/#where)
- [ ] `/api/songs/name/:name` GET specific song by name  
- [ ] `/api/songs/sort/by-date` GET all songs and order by date created
  - [Sequelize Ordering Docs](http://docs.sequelizejs.com/en/latest/docs/querying/#ordering)
- [ ] `api/songs/sort/a-z` GET all songs sorted alphabetically by title
- [ ] `api/songs/count` GET the count of the number of songs in the database
  - [Sequelize count docs](http://docs.sequelizejs.com/en/latest/docs/models-usage/#count-count-the-occurrences-of-elements-in-the-database)
- [ ] `api/songs/first-five` GET the first five songs, ordered by date created. You should return exactly five songs.
  - [Sequelize 'limit' docs](http://docs.sequelizejs.com/en/latest/docs/models-usage/#manipulating-the-dataset-with-limit-offset-order-and-group)
- [ ] `/api/artists` GET all artists
- [ ] `/api/artists/sort/a-z` GET all artists sorted alphabetically  
- [ ] `/api/artists/id/:id` GET specific artist by id
- [ ] `/api/artists/name/:name` GET specific artist by name
- [ ] `/api/artists/no-jungle` GET all artists except for 'Jungle'
  - [Sequelize complex filtering](http://docs.sequelizejs.com/en/latest/docs/models-usage/#complex-filtering-or-not-queries)
- [ ] `/api/artists/frank-or-chromeo` GET all songs where the artist is either 'Frank Ocean' OR 'Chromeo'
  - [Sequelize complex filtering](http://docs.sequelizejs.com/en/latest/docs/models-usage/#complex-filtering-or-not-queries)
- [ ] `/api/songs-with-artists` GET all songs with artist fully populated (in other words, the full artist information should be displayed, including artist name and id)
  - [Sequelize Relations/Assocations (aka JOIN queries)](http://docs.sequelizejs.com/en/latest/docs/querying/#relations-associations)
  - [How to Make Join Queries in Sequelize](http://stackoverflow.com/questions/20460270/how-to-make-join-querys-using-sequelize-in-nodejs)
- [ ] go back and refactor all of your previous endpoints to include the full artist info
- [ ] `/api/artists` POST a new artist
  - [Sequelize 'findOrCreate' docs](http://docs.sequelizejs.com/en/latest/docs/models-usage/#findorcreate-search-for-a-specific-element-or-create-it-if-not-available)
- [ ] `/api/artists/:id` DELETE a artist
  - [Mongoose remove Docs](http://mongoosejs.com/docs/api.html#query_Query-remove)
- [ ] `/api/artists/:id` PUT (update) an artist
  - [Mongoose findOneAndUpdate docs](http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate)

## User Interface
- [ ] create an 'html' page called 'all-songs.html'. The page should display all the songs in your database as a list
- [ ] create an `html` page called 'artist-search.html'. add a text input box and submit button to the page. when you type something into the input box and hit enter, you should GET database entries for all of the songs by the artist that you typed into the input box. Display the songs in a list, and include both title and artist. Include an `app.get` route in your server for your new HTML file, so you can test it in your browser. 
- [ ] create an `html` page called 'youtube-search.html'. add a text input box and submit button to the page. when you type something into the input box and hit enter, you should make an AJAX request to the YouTube API to search for videos that match the input text. Display the search results on your page, by title. In other words you should render a list of youtube videos on your page whenever you submit something new into the input box. Include an `app.get` route in your server for your new HTML file, so you can test it in your browser.  
- [ ] add a '+' button to your list of search results (in other words, each youtube video title in the search results should have a '+' button next to it). When you click the '+' button that specific song should be added to your database

## Bonuses
- refactor your routes to use express router
  - [Express Router Docs](http://expressjs.com/en/api.html#router)
  - [Learn to Use Express Router](https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4)
