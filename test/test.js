const assert = require('assert');
let grid = require('../lib/grid');

describe('The grid\'s square', function () {

    it('should not be colorized when no square is around', function() {
        grid.init(1, 1);
        grid.run();
        let square = grid.getSquare(1);

        assert.equal(square.getStatus(), 1);
        assert.equal(square.getColor(), '-');
    });

    it('should be correctly colorized on 2x2', function() {
        grid.init(2, 2);
        grid.run();

        [1,2,3,4].forEach((idx) => {
            assert.equal(grid.getSquare(idx).getStatus(), 1);
            assert.equal(grid.getSquare(idx).getColor(), 'p');
        });
    });

    it('should be correctly colorized on 3x3', function() {
        grid.init(3, 3);
        grid.run();
        ['p','o','p','o','r','o','p','o','p'].forEach((color, idx) => {
            assert.equal(grid.getSquare(idx + 1).getStatus(), 1);
            assert.equal(grid.getSquare(idx + 1).getColor(), color);
        });
    });

    it('should be correctly colorized on 5x5', function() {
        grid.init(5, 5);
        grid.run();
        ['p','o','o','o','p','o','r','r','r','o'].forEach((color, idx) => {
            assert.equal(grid.getSquare(idx + 1).getStatus(), 1);
            assert.equal(grid.getSquare(idx + 1).getColor(), color);
        });
    });
});
