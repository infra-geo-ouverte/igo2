import * as gulp from 'gulp';
import { argv } from 'yargs';

// tslint:disable-next-line: no-var-requires
require('../gulpfile');

const TASK = argv['task'];

if (!TASK) {
  throw new Error('You must specify a task name.');
}

console.log('**********************');
console.log('* Igo2 tools ');
console.log('* debugging task:', TASK);
console.log('**********************');

gulp.start(TASK);
