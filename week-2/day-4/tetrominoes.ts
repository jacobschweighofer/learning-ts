export type EmptyCell = 0;
export type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export type CellState = EmptyCell | TetrominoType;

export type Board = CellState[][];
export type Matrix = CellState[][];

export interface BaseTeromino {
  type: TetrominoType;
  matrix: Matrix;
}

export interface ITetromino extends BaseTeromino {
  type: "I";
  matrix: [[0, 0, 0, 0], ["I", "I", "I", "I"], [0, 0, 0, 0], [0, 0, 0, 0]];
}

export interface JTetromino extends BaseTeromino {
  type: "J";
  matrix: [["J", 0, 0], ["J", "J", "J"], [0, 0, 0]];
}

export interface LTetromino extends BaseTeromino {
  type: "L";
  matrix: [[0, 0, "L"], ["L", "L", "L"], [0, 0, 0]];
}

export interface OTetromino extends BaseTeromino {
  type: "O";
  matrix: [["O", "O"], ["O", "O"]];
}

export interface STetromino extends BaseTeromino {
  type: "S";
  matrix: [[0, "S", "S"], ["S", "S", 0], [0, 0, 0]];
}

export interface TTetromino extends BaseTeromino {
  type: "T";
  matrix: [[0, "T", 0], ["T", "T", "T"], [0, 0, 0]];
}

export interface ZTetromino extends BaseTeromino {
  type: "Z";
  matrix: [["Z", "Z", 0], [0, "Z", "Z"], [0, 0, 0]];
}

export type Tetromino =
  | ITetromino
  | JTetromino
  | LTetromino
  | OTetromino
  | STetromino
  | TTetromino
  | ZTetromino;

export type Position = {
  readonly x: number;
  readonly y: number;
};

export type ActivePiece = {
  readonly type: TetrominoType;
  readonly shape: Matrix;
  readonly position: Position;
};
