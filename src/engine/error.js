export class IllegalMoveError extends Error {
  constructor(message) {
    super(message);
    this.name = "IllegalMoveError";
  }
};