
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

function normalized_avg(cur_set) {

    if (!cur_set.length) {
        return "error!";
    }

    const total_weight = cur_set.reduce(function(prev, curr) {
        return prev + curr.w;
    }, 0);

    const avg = cur_set.reduce(function(prev, curr) {
        return prev + ((curr.w / total_weight) * curr.v)}, 
    0);
    
    return avg
}

function knapsack(marks, credits) {
    const debug = false;
    var memo = [];
    // console.log("Credit threshold: " + credits);


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
        var res = lastRow[lastRow.length - 1];
        const solnCredits = res.subset.reduce(function (prev, curr) {
            return prev + curr.w;
        }, 0);
        console.log("\n----------------\nFinal result:");
        console.log("Credit target: \t\t\t" + credits);
        console.log("Solution credits: \t\t" + solnCredits);
        console.log("Normalized Average: \t\t" + res.normalizedAvg);
        console.log("Courses:")
        console.log(res.subset)


        // console.log(res);
        return res
    }

    function getSolution(row, cap) {
        const NO_SOLUTION = { maxValue: 0, normalizedAvg: 0, subset: [] };
        var col = cap - 1;
        var lastItem = marks[row];

        // if (credits - lastItem.w < 0) {
        //     return lastSolution;
        // }

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

        /* 
        if you do not want single solutions that exceed
        the credit target, uncomment this function
        ie. when a single 5 credit course {w: 5, v: 100}
        would be the optimal solution for a credit target of 4
        
        if (credits - lastItem.w < 0) {
            return lastSolution;
        }
        */

        if (remaining < 0) {
            return lastSolution;
        }

        var lastAvg = lastSolution.normalizedAvg;

        var lastSubValue = lastSubSolution.maxValue;

        var newValue = lastSubValue + lastItem.v * lastItem.w;
        var lastSubsetCopy = lastSubSolution.subset.slice(); // dunno if this is necessary

        lastSubsetCopy.push(lastItem)
        const newAvg = normalized_avg(lastSubsetCopy)

        // console.log(lastSolution);
        // console.log(lastSubSolution);
   
        if (newAvg >= lastAvg) {
            var _lastSubSet = lastSubSolution.subset.slice();
            _lastSubSet.push(lastItem);


            debug ? () => {
                console.log("--------------------------\nNew solution found!");
                console.log({
                    maxValue: newValue,
                    normalizedAvg: newAvg,
                    subset: _lastSubSet
                });
            } : false;

            
            return { maxValue: newValue, normalizedAvg: newAvg, subset: _lastSubSet };
        } else {
            return lastSolution;
        }
    }
}

module.exports = knapsack;