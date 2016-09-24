'use strict';

const _ = require('lodash');

let grid = [];
let totalSquare;

function init(colNb, lineNb) {
    let position = 0;
    totalSquare = colNb * lineNb;
    return grid = Array.from(new Array(colNb), _ => {
        let line = getLine(lineNb, position);
        position+= line.length;
        return line;
    });
}

function getLine(squareNb, position) {
    return Array.from(new Array(squareNb), () => {
        return new Square(position+=1);
    });
}

function getSquare(searchedPosition) {
    return _(grid)
        .flatten()
        .find({
            position: searchedPosition
        });
}

function isSquareColorizable() {
    return (Math.floor(Math.random() * 3) + 1) ? 1 : 0;
}

function isSquareActivated(searchedPosition) {
    let square = getSquare(searchedPosition);
    return square !== undefined ? square.isStateActive() : 0;
}

function countActivesSquares(position) {
    let sum = [
        isSquareActivated(position - 5), // top
        isSquareActivated(position + 1), // right
        isSquareActivated(position + 5), // bottom
        isSquareActivated(position - 1) // left
    ].reduce((positions, position) => positions + position, 0);
    return isASquareBorder(position) ? sum - 1 : sum;
}

function isASquareBorder(position) {
    return position !== 1 && position !== totalSquare &&
        (position % 5 === 0 || (position - 1) % 5 === 0);
}

function colorizeSquares() {
    grid.forEach((line) => {
        line.forEach((square) => {
            square.colorize();
        });
    });
}

function Square(_position) {
    let status = isSquareColorizable();
    let position = _position;
    let color;
    return {
        position: position,
        colorize: colorize,
        isStateActive: isStateActive,
        getColor: getColor,
        getStatus: getStatus
    };

    function getColor() {
        return color;
    }

    function isStateActive() {
        return status === 1 ? 1 : 0;
    }

    function getStatus() {
        return status;
    }

    function colorize() {
        if (!status) {
            return;
        }
        switch (countActivesSquares(position)) {
            case 1 :
                color = 'g';
                break;
            case 2 :
                color = 'p';
                break;
            case 3 :
                color = 'o';
                break;
            case 4 :
                color = 'r';
                break;
        }
        return this;
    }
}

module.exports = {
    init: init,
    colorizeSquares: colorizeSquares
};
