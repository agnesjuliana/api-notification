const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const logger = require("./helpers/utils/logger");




const publicVapidKey = 'BBY2Bodhi8oGHbwXUn1ZollohsJKrsxc-BlHnG7eQsM2MIztTPE374HcWMOXe5yhYDwtTJaedQSo9f7Yvis7bb0';
const privateVapidKey = 'Dew_wXTjwFZ-xDPOBqCX0ZTq0aGcFv8Wx-wgfY6VMyI';

app.use(bodyParser.json())



webpush.setVapidDetails('mailto:mercymeave@section.com', publicVapidKey,privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res)=>{
    //get push subscription object from the request
    const subscription = req.body;

    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({title: 'Section.io Push Notification' });

    //pass the object into sendNotification fucntion and catch any error
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