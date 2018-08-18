// CHECKER CODE BY 0xsven
let _rows, _cols, _grid;

let _validate = data => {
	// console.log('data at validate', data);
	for (var row = 0; row < 9; row++) {
		data[row].sort();

		for (var col = 0; col < 9; col++) {
			var value = data[row][col], next_value = data[row][col + 1];

			// check if value exists and is a valid number
			if (!(value && value > 0 && value < 10)) {
				return false;
			}

			// check if numbers are unique
			if (col !== 8 && value === next_value) {
				return false;
			}
		}
	}
	return true;
};

// reorganize data into three structures
let _reorganizeData = data => {
	console.log('in reorganize!');
	_rows = data;
	_cols = [];
	_grid = [];
	let gridRow, gridCol, gridIndex;

	// Prefilling the structures with empty array objects
	for (var i = 0; i < 9; i++) {
		_cols.push([]);
		_grid.push([]);
	}

	for (var row = 0; row < 9; row++) {
		for (var col = 0; col < 9; col++) {
			// Save each column in a new row
			_cols[col][row] = data[row][col];

			// Calculate grid identifiers
			gridRow = Math.floor(row / 3);
			gridCol = Math.floor(col / 3);
			gridIndex = gridRow * 3 + gridCol;

			// Save each grid in a new row
			_grid[gridIndex].push(data[row][col]);
		}
	}
	return { grid: _grid, rows: _rows, cols: _cols };
};

module.exports = {
	_rows,
	_cols,
	_grid,

	// validate rows

	// initialize the module with input data
	initChecker: data => {
		return _reorganizeData(data);
		// return 5;
	},
	// return true if sudoku is valid
	isValid: obj => {
		return _validate(obj.rows) && _validate(obj.cols) && _validate(obj.grid);
	}
};

// var sudoku_data = [
// 	[5, 3, 4, 6, 7, 8, 9, 1, 2],
// 	[6, 7, 2, 1, 9, 5, 3, 4, 8],
// 	[1, 9, 8, 3, 4, 2, 5, 6, 7],
// 	[8, 5, 9, 7, 6, 1, 4, 2, 3],
// 	[4, 2, 6, 8, 5, 3, 7, 9, 1],
// 	[7, 1, 3, 9, 2, 4, 8, 5, 6],
// 	[9, 6, 1, 5, 3, 7, 2, 8, 4],
// 	[2, 8, 7, 4, 1, 9, 6, 3, 5],
// 	[3, 4, 5, 2, 8, 6, 1, 7, 9]
// ];

// export default Checker;
// Checker.init(sudoku_data).isValid();
