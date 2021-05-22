import log4js from 'log4js';

/**
 * Configure logger, append text in console and save to file.
 * Docs about log4js: https://log4js-node.github.io/log4js-node/
 */
log4js.configure({
  appenders: {
    file: {
      type: 'file',
      layout: { type: 'basic' },
      filename: 'logs/app.log',
      maxLogSize: 10485760,
      backups: 3,
      keepFileExt: true
    },
    errorLog: { type: 'file', filename: 'logs/error.log' },
    error: { type: "logLevelFilter", level: "error", appender: 'errorLog' },

  },
  categories: {
    default: { appenders: ['file', 'error',], level: 'info' },

  },
});

/**
 * Get logger instance and export as function.
 * Usage: logger(moduleName (string), message (string), type (string)).
 */
const loggerInstance = log4js.getLogger('[APP]');
export default (moduleName: string, msg: string, type: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'): void => loggerInstance[type](`[${moduleName}] ${msg}`);
