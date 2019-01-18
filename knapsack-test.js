var assert = require('assert');
const knapsack = require('./knapsack');

const marks = [
    { w: 5, v: 40 },
    { w: 2, v: 10 },
    { w: 2, v: 20 },
    { w: 2, v: 100 },
    { w: 3, v: 5 },
    { w: 3, v: 50 },
    { w: 5, v: 99 },
    { w: 11, v: 50 }
];

const other_marks = [
    { w: 5, v: 50},
    { w: 2, v: 50},
    { w: 3, v: 51},
]

describe('real bad tests mmmmmm', () => {
    it('6 credit requirement', () => {
        const res = knapsack(marks, 6);
        expect(assert.deepEqual(res.subset, [{ w: 2, v: 100 }, { w: 5, v: 99 }]))
    });

    it('6 credit requirement', () => {
        const res = knapsack(marks, 6);
        assert.deepEqual(res.subset, [{ w: 2, v: 100 }, { w: 5, v: 99 }])
        assert.equal(res.avg, 99.29)
    });

    it('5 credit requirement', () => {
        test2 = knapsack(marks, 5);
        assert.deepEqual(test2.subset, [{ w: 5, v: 99 }])
        assert.equal(test2.avg, 99)
    });

    it('11 credit requirement (should choose multiple)', () => {
        test3 = knapsack(marks, 11);
        assert.deepEqual(test3.subset, [{ w: 5, v: 40 }, { w: 2, v: 100 }, { w: 5, v: 99 }])
        assert.equal(test3.avg, 74.58)
    });

    it('11 credit requirement (should choose one)', () => {
        marks.push({ w: 11, v: 100 })
        test4 = knapsack(marks, 11);
        assert.deepEqual(test4.subset, [{ w: 11, v: 100 }])
        assert.equal(test4.avg, 100)
    });

    it('Chooses more courses if they contribute to a better average', () => {
        const res = knapsack(other_marks, 5);
        assert.deepEqual(res.subset, [{"v": 50, "w": 2}, {"v": 51, "w": 3}])
        // assert.equal(test4.avg, 100)
    });
});
