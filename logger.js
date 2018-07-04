const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} ${info.level} - ${info.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    colorize(),
    myFormat
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
