'use strict';

const linesNb = 5;
const columnsNb = 5;

let grid = require('./lib/grid');
let dataGrid = grid.init(linesNb, columnsNb);

console.log('----- colors ------', '\n');
dataGrid.forEach((line) => {
    let colors = [];
    line.forEach((square) => {
        square.colorize();
        colors.push(
            square.getColor()
        );
    });
    console.log(colors.join(' | '), '\n');
});

console.log('----- status ------', '\n');
dataGrid.forEach((line) => {
    let colors = [];
    line.forEach((square) => {
        square.colorize();
        colors.push(
            square.getStatus()
        );
    });
    console.log(colors.join(' | '), '\n');
});
