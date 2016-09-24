'use strict';

const linesNb = 5;
const columnsNb = 5;

let grid = require('./lib/grid');
let dataGrid = grid.init(linesNb, columnsNb);

console.log('----- colors ------');
dataGrid.forEach((line) => {
    let colors = [];
    line.forEach((square) => {
        colors.push(
            square.colorize().getColor()
        );
    });
    console.log(colors.join(' | '), '\n');
});

console.log('----- status ------', '\n');
dataGrid.forEach((line) => {
    let colors = [];
    line.forEach((square) => {
        colors.push(
            square.colorize().getStatus()
        );
    });
    console.log(colors.join(' | '), '\n');
});
