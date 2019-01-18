
/*
So, I think this is close. It will only meet OR exceed the credit requirements
(I thikn by only one course), but sometimes it is overly eager to use multiple courses
when a single course would be better. 

	EDIT: MAYBE IGNORE BELOW IT MIGHT BE WORKING
	EG. If credit target is 5, and there's a course
		{w: 5, v: 100} 
	it will sometimes choose multiple classes like:
		{ w: 2, v: 90 }
		{ w: 2, v: 99 }
		{ w: 3, v: 50 }
	Despite this being a lower average.
*/

function knapsack(marks, credits) {
    var memo = [];

    // Filling the sub-problem solutions grid.
    for (var i = 0; i < marks.length; i++) {
        // Variable 'cap' is the credits for sub-problems. In this example, 'cap' ranges from 1 to 6.
        var row = [];
        for (var cap = 1; cap <= credits; cap++) {
            row.push(getSolution(i, cap));
        }
        memo.push(row);
    }

    // The right-bottom-corner cell of the grid contains the final solution for the whole problem.
    return getLast();

    function getLast() {
        var lastRow = memo[memo.length - 1];
        var weighted_avg = 0;
        var res = lastRow[lastRow.length - 1];
        var res_list = res["subset"];

        if (!res_list.length) {
            return "error!";
        }

        var total_weight = res_list.map(x => (x = x.w)).reduce((a, b) => a + b);

        for (let q = 0; q < res_list.length; q++) {
            var adjusted_weight = (res_list[q].w / total_weight) * res_list[q].v;
            weighted_avg += adjusted_weight;
        }

        const adjusted_avg = Math.round(weighted_avg * 100) / 100
        // console.log("Adjusted Avg: " + adjusted_avg);


        Object.assign(res, {
            avg: adjusted_avg
        })
        // console.log(res)
        return res
    }

    function getSolution(row, cap) {
        const NO_SOLUTION = { maxValue: 0, subset: [] };
        var col = cap - 1;
        var lastItem = marks[row];

        // The remaining credits for the sub-problem to solve.
        if (cap - lastItem.w < 0) {
            var remaining = 1 + cap - lastItem.w;
        } else {
            var remaining = cap - lastItem.w;
        }

        // Refer to the last solution for this credits,
        // which is in the cell of the previous row with the same column
        var lastSolution =
            row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;

        // Refer to the last solution for the remaining credits,
        // which is in the cell of the previous row with the corresponding column
        // var lastSubSolution = row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;
        var lastSubSolution =
            row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;

        if (remaining < 0) {
            return lastSolution;
        }

        var lastValue = lastSolution.maxValue;
        var lastSubValue = lastSubSolution.maxValue;

        // Maybe this is the problem?
        var newValue = lastSubValue + lastItem.v * lastItem.w;
        // var newValue = lastSubValue + lastItem.v * lastItem.w;

        if (newValue >= lastValue) {
            var _lastSubSet = lastSubSolution.subset.slice();
            _lastSubSet.push(lastItem);
            return { maxValue: newValue, subset: _lastSubSet };
        } else {
            return lastSolution;
        }
    }
}


module.exports = knapsack;