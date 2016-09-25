'use strict';

const linesNb = 5;
const columnsNb = 5;

let grid = require('./lib/grid');
grid.init(linesNb, columnsNb);
grid.run('getColor');
grid.run('getStatus');
