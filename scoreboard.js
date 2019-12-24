
//set up dependencies
const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");
var _ = require("underscore");
var cors = require('cors');
const moment = require('moment');
moment().format();

//setup port constants
const redis_port = process.env.REDIS_URL || 6379;
const redis_host = process.env.REDIS_HOST || "127.0.0.1";
const port = process.env.PORT || 5000;
console.log("Connecting to "+redis_host+":"+redis_port);
const redis_client = redis.createClient(redis_port, redis_host);
const app = express();

moment().format();
//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())




app.get("/scores/:id", cors(), async (req, res) => {
    try {
        const { id } = req.params;
        //add data to Redis
        redis_client.zrevrange(id, 0, -1, "WITHSCORES", function (err, obj) {
            var highest =  _.chunk(obj, 2).slice(0,5)
            var ret = _.map(highest, function(rec) {
                var score = rec[1];
                var keys = rec[0].split('|');
                var name = keys[0];
                var score_day = keys[1];
                var result = {
                    "score" : score, "name" : name, "score_day" : score_day
                }
                console.log(result);
                return result;

            })
            return res.json(ret);
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

app.post("/scores/:id", cors(), async (req, res) => {
    try {
        const { id } = req.params;

        var score = req.body.score;
        var name = req.body.name;
        var key = name +'|'+moment().format("DD/MM/YYYY hh:ss");
        console.log("Zadd: "+score+", "+name);
        //add data to Redis
        redis_client.zadd(id, score, key, function (err, obj) {
            return res.json(obj);
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});


app.listen(port, () => console.log(`Server running on Port ${port}`));