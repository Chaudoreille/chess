export class IllegalMoveError extends Error {
  constructor(message) {
    super(message);
    this.name = "IllegalMoveError";
  }
};

export class BoundaryError extends Error {
  constructor(message) {
    super(message);
    this.name = "BoundaryError";
  }
}

export class GameError extends Error {
  constructor(message) {
    super(message);
    this.name = "GameError";
  }
}