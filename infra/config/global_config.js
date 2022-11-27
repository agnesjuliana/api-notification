require('dotenv').config();
const confidence = require('confidence');

const config = {
    port: process.env.PORT,
    // basicAuthApi: [
    //     {
    //         username: process.env.BASIC_AUTH_USERNAME,
    //         password: process.env.BASIC_AUTH_PASSWORD
    //     }
    // ],
    mongoDbUrl: process.env.MONGO_DATABASE_URL,
    jwtKey: process.env.JWT_KEY,
    jwtKeyAdmin: process.env.JWT_KEY_ADMIN,
    email: process.env.EMAIL,
    pass: process.env.PASS,
    superadmin: [
        {
            username: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD
        }
    ]
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
