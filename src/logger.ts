'use strict';

import chalk from 'chalk';

export const log = {
  info: console.log.bind(console, chalk.bold('tubitv:')),
  warn: console.log.bind(console, chalk.yellow('tubitv warning:')),
  debug: console.log.bind(console, chalk.yellow('tubitv debug:')),
  error: console.error.bind(console, chalk.red.bold.underline('tubitv error:'))
};

export default log;
