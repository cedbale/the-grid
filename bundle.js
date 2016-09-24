'use strict';

const linesNb = 5;
const columnsNb = 5;

let grid = require('./lib/grid.js');
let dataGrid = grid.init(linesNb, columnsNb);

dataGrid.forEach((line) => {
    line.forEach((square) => {
        createHTMLSquare(
            square.colorize().getColor()
        );
    });
});

function createHTMLSquare(color) {
    let square = document.createElement('div');
    square.className = 'square';
    square.style.cssText = 'background-color:' + getHexa(color) + ';';
    document.body.appendChild(square);
    return square;
}

function getHexa(color) {
    switch (color) {
        case 'r' : return 'red';
        case 'p' : return 'purple';
        case 'g' : return 'green';
        case 'o' : return 'orange';
    }
}
