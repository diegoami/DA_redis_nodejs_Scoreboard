
//set up dependencies
const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");

//setup port constants
const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || 5000;
const redis_client = redis.createClient(port_redis);
const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get("/scores/:id", async (req, res) => {
    try {
        const { id } = req.params;

        //add data to Redis
        redis_client.zrange(id, 0, -1, function (err, obj) {
            return res.json(obj);
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

app.listen(port, () => console.log(`Server running on Port ${port}`));