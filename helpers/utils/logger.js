const winston = require("winston");
const moment = require("moment")

const logger = winston.createLogger({
  transports: [new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  })
  ],
  exitOnError: false
});

const log = (context, message, scope) => {
  const obj = {
    context,
    scope,
    message: message.toString(),
    time: moment().format()
  };
  // sentryLog.sendError(obj);
  logger.info(obj);
};

const logOnly = (context, message, scope) => {
  const obj = {
    context,
    scope,
    message: message.toString()
  };
  logger.info(obj);
};

module.exports = {
  log,
  logOnly
};
