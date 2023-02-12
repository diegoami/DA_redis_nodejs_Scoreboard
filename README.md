# REDIS NODEJS SCOREBOARD
A scoreboard in redis and node js


This script is a simple Express.js based API for a leaderboard application. It connects to Redis, a key-value data store, to manage the scores and rankings. 

The API has two endpoints: `GET /scores/:id` and `POST /scores/:id`, where :id is the identifier for a specific leaderboard. 

The GET endpoint retrieves the highest 5 scores of the leaderboard specified by :id. 

The POST endpoint adds a new score to the leaderboard with the score information being passed in the request body.

The scores are stored in Redis as sorted sets, with each score having a unique key that combines the user's name and the date/time the score was recorded. 

The API also uses moment.js for date/time formatting, underscore.js for data manipulation, and cors for enabling cross-origin resource sharing. 

The API listens on a port specified by the PORT environment variable or 5000 by default.

