export type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export type Board = number[][];
export type Matrix = number[][];

export interface BaseTeromino {
  type: TetrominoType;
  matrix: Matrix;
}

interface ITetromino extends BaseTeromino {
  type: "I";
  matrix: Matrix;
}
interface JTetromino extends BaseTeromino {
  type: "J";
  matrix: Matrix;
}
interface LTetromino extends BaseTeromino {
  type: "L";
  matrix: Matrix;
}
interface OTetromino extends BaseTeromino {
  type: "O";
  matrix: Matrix;
}
interface STetromino extends BaseTeromino {
  type: "S";
  matrix: Matrix;
}
interface TTetromino extends BaseTeromino {
  type: "T";
  matrix: Matrix;
}
interface ZTetromino extends BaseTeromino {
  type: "Z";
  matrix: Matrix;
}

type Tetromino =
  | ITetromino
  | JTetromino
  | LTetromino
  | OTetromino
  | STetromino
  | TTetromino
  | ZTetromino;

const original = [
  [1, 2, 3],
  [4, 5, 6],
]; // To transpose this, would mean to swap the col and row lengths. Also, Matrix[1][2] to Matrix[2][1]

export const rotateClockwise = (matrix: number[][]): number[][] => {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  const result: number[][] = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0),
  );

  for (let r = 0; r < rows; r++) {
    const row = matrix[r];
    if (!row) continue;

    for (let c = 0; c < cols; c++) {
      const targetRow = result[c];
      if (targetRow) {
        targetRow[rows - 1 - r] = row[c] ?? 0;
      }
    }
  }
  return result;
};

const newMatrix = rotateClockwise(original);

console.log(newMatrix);

export const describePiece = (piece: Tetromino): string => {
  switch (piece.type) {
    case "I":
      return "I-Piece (Straight / Line): A 4x1 flat line piece used for clearing 4 rows at once (a Tetris).";
    case "J":
      return "J-Piece (J-Block): A 3x2 L-shaped piece pointing left, useful for fitting into left-side notches.";
    case "L":
      return "L-Piece (L-Block): A 3x2 L-shaped piece pointing right, useful for fitting into right-side notches.";
    case "O":
      return "O-Piece (Square): A 2x2 square block that does not change shape when rotated.";
    case "S":
      return "S-Piece (S-Zigzag): A 3x2 horizontal zigzag piece extending to the right.";
    case "T":
      return "T-Piece (T-Block): A 3x2 T-shaped piece versatile for T-spins and filling gaps.";
    case "Z":
      return "Z-Piece (Z-Zigzag): A 3x2 horizontal zigzag piece extending to the left.";
    default: {
      const _exhaustiveCheck: never = piece;
      return `Unknown piece: ${JSON.stringify(_exhaustiveCheck)}`;
    }
  }
};

export const projectPiece = (
  board: Board,
  pieceMatrix: Matrix,
  startRow: number,
  startCol: number,
): Board => {
  // 1. Deep clone the board so we don't mutate the original
  const boardCopy = board.map((row) => [...row]);

  // 2. Overlay the piece matrix onto the clone
  const rows = pieceMatrix.length;
  const cols = pieceMatrix[0]?.length ?? 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = pieceMatrix[r]?.[c];
      if (cell !== 0 && cell !== undefined) {
        // Moving down and to the right by one space per loop
        const targetRow = startRow + r;
        const targetCol = startCol + c;

        if (boardCopy[targetRow]?.[targetCol] !== undefined) {
          boardCopy[targetRow][targetCol] = cell;
        }
      }
    }
  }
  return boardCopy;
};

export const hasCollision = (
  board: Board,
  pieceMatrix: Matrix,
  targetRow: number,
  targetCol: number,
): boolean => {
  const boardRows = board.length;
  const boardCols = board[0]?.length ?? 0;

  for (let r = 0; r < pieceMatrix.length; r++) {
    const row = pieceMatrix[r];
    if (!row) continue;

    for (let c = 0; c < row.length; c++) {
      const cell = row[c];

      if (cell === 0 || cell === undefined) continue;

      const globalRow = targetRow + r;
      const globalCol = targetCol + c;

      const isOutOfBounds =
        globalRow >= boardRows || globalCol >= boardCols || globalCol < 0;

      if (isOutOfBounds) return true;

      if (globalRow >= 0) {
        const isOccupied = board[globalRow]?.[globalCol] !== 0;
        if (isOccupied) return true;
      }
    }
  }
  return false;
};
