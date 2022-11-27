const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const logger = require("./helpers/utils/logger");
const cors = require("cors");

const publicVapidKey = 'BBY2Bodhi8oGHbwXUn1ZollohsJKrsxc-BlHnG7eQsM2MIztTPE374HcWMOXe5yhYDwtTJaedQSo9f7Yvis7bb0';
const privateVapidKey = 'Dew_wXTjwFZ-xDPOBqCX0ZTq0aGcFv8Wx-wgfY6VMyI';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

webpush.setVapidDetails('mailto:mercymeave@section.com', publicVapidKey,privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res)=>{
    const subscription = req.body;
    res.status(201).json({})
    const payload = JSON.stringify({title: 'Section.io Push Notification' });
    webpush.sendNotification(subscription, payload).then(res => console.log("success")).catch(err=> console.error(err));
})

app.use(express.static(path.join(__dirname, "client")));

// routes
const user = require("./app/user/user_controller");

user.routes(app);

// db connection
const mongooseConnection = require("./helpers/databases/mongodb/connection");
mongooseConnection.getConnection();


// app connection
const port = 5003;
app.listen(port, () => {
    const ctx = "app-listen";
    logger.log(ctx, `App listening at http://localhost:${port}`, "Initate application");
  });