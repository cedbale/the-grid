'use strict';

const _ = require('lodash');

let grid = [];
let totalSquare, colNb, lineNb;

function init(_colNb, _lineNb) {
    let position = 0;
    lineNb = _lineNb;
    colNb = _colNb;
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
        isSquareActivated(position - lineNb), // top
        isSquareActivated(position + 1), // right
        isSquareActivated(position + lineNb), // bottom
        isSquareActivated(position - 1) // left
    ].reduce((positions, position) => positions + position, 0);
    return isASquareBorder(position) ? sum - 1 : sum;
}

function isASquareBorder(position) {
    return position !== 1 && position !== totalSquare &&
        (position % lineNb === 0 || (position - 1) % lineNb === 0);
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
            color = '-';
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
            default:
                color = '-';
                break;
        }
    }
}

function run(cbToDisplay) {
    let output = ['\n'];
    if (cbToDisplay) {
        console.log(' ----- ' + cbToDisplay + ' ------');
    }
    _(grid)
        .flatten()
        .forEach((square, idx) => {
            square.colorize();
            if (cbToDisplay) {
                output.push(
                    square[cbToDisplay]()
                );
                if ((idx + 1) % lineNb === 0) {
                    output.push('\n');
                }
            }
        });
    if (cbToDisplay) {
        console.log(output.join(' | '), '\n');
    }
}

module.exports = {
    init: init,
    getSquare: getSquare,
    run: run
};
