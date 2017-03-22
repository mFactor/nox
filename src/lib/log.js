/**
 * Astral Logger
 * Each can be imported globally through ES6 standard
 */
import winston from 'winston';
import { validateProp } from 'lib/libastral';

// Winston log customizations
const custom = {
  levels: {
    trace: 0,
    input: 1,
    verbose: 2,
    prompt: 3,
    debug: 4,
    info: 5,
    data: 6,
    help: 7,
    warn: 8,
    error: 9,
  },
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red',
  },
  consoleOpts: {
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true,
  },
  fileOpts: {
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true,
  },
};

// Node system log
const sysLog = new winston.Logger({
  level: 'error',
  levels: custom.levels,
  transports: [
    new (winston.transports.Console)(custom.consoleOpts),
  ],
});

class Log {
  constructor(req) {
    this.entry = {
      timestamp: new Date().toUTCString(),
      route: req.originalUrl,
      level: null,
      server: [],
      client: [],
    };
  }

  server(msg, level) {
    this.setLevel(level);
    this.entry.server.push(msg);
  }

  client(msg, level) {
    this.setLevel(level);
    this.entry.client.push(msg);
  }

  print() {
    sysLog[this.entry.level](this.entry);
  }

  /**
   * Set log level, most critical log level persists for printing
   */
  setLevel(level) {
    if (!validateProp(custom.levels, level)) {
      this.entry.server.push(`Supplied level is invalid, setting to warn`);
      level = 'warn';
    }
    if (!this.entry.level || (custom[this.entry.level] < custom[level])) {
      this.entry.level = level;
    }
  }
}

export { sysLog, Log };
