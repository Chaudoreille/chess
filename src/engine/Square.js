import { A_CHAR_CODE } from "./constants.js";

class Square {
  constructor(x, y) {
    x = Number(x);
    y = Number(y);
    if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
      throw new Error(`invalid arguments for Square contructor: x = ${x} y = ${y}`);
    }
    this.x = x;
    this.y = y;
    this.name = Square.name(x, y);
    Object.freeze(this);
  }

  static fromName(name) {
    const decomposedName = name.match(/^([\w]+)(\d)+$/);
    const column = decomposedName[1];
    const row = decomposedName[2];

    const x = columnNameToIndex(column);
    const y = +row - 1;

    return new Square(x, y);
  }

  static name(x, y) {
    const columnName = indexToColumnName(x);

    return `${columnName}${y + 1}`;
  }
}

/**
 * returns the column name for the given index
 * column name is a purely alphabetical base 26 conversion of the number
 * - indexToColumnName(0) -> a
 * - indexToColumnName(25) -> z
 * - indexToColumnNmae(26) -> aa
 * @param {number} columnIndex
 * @returns {String} the column name
 */
function indexToColumnName(columnIndex) {
  let columnName = String.fromCharCode(A_CHAR_CODE + (columnIndex % 26));
  columnIndex = Math.floor(columnIndex / 26);

  while (columnIndex > 0) {
    columnIndex--;
    columnName = String.fromCharCode(A_CHAR_CODE + columnIndex % 26) + columnName;
    columnIndex = Math.floor(columnIndex / 26);
  }

  return columnName;
}

/**
 * takes a board's column name and returns it's corresponding index
 * @param {String} columnName
 * @returns {number}
 */
function columnNameToIndex(columnName) {
  let columnIndex = -1;
  let power = 1;

  for (let i = columnName.length - 1; i >= 0; i--) {
    columnIndex += power * (columnName.charCodeAt(i) - A_CHAR_CODE + 1);
    power *= 26;
  }
  return columnIndex;
}

export default Square;
