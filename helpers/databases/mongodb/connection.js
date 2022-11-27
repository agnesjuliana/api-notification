const mongoose = require('mongoose');
const logger = require("../../utils/logger");
const config = require("../../../infra/config/global_config");

module.exports = {
    getConnection: () => {
        const ctx = 'mongooseConnections';
        const configMongoose = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        try {
            mongoose.connect(config.get('/mongoDbUrl'), configMongoose);
            const db = mongoose.connection;
            db.on('connected', () => logger.log(ctx, 'Mongoose Connected', 'info'));
            db.on('disconnected', () => logger.log(ctx, 'Mongoose Disconnected', 'info'));
            return db;
        } catch (error) {
            logger.log(ctx, error, 'error');
        }
    },
};
