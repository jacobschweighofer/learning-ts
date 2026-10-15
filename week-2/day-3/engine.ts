import { TETROMINO_SHAPES } from "./matrix.js";
import type {
  Board,
  Matrix,
  CellState,
  Position,
  ActivePiece,
  TetrominoType,
} from "./tetrominoes.js";

export const printError = (msg: string): never => {
  throw new Error(`FATAL ERROR: ${msg}`);
};

export const createNewBoard = (rows: number, cols: number): Board =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, (): CellState => 0),
  );

export const rotate = <T>(matrix: T[][], isClockwise: boolean): T[][] => {
  const rows = matrix.length;
  if (rows === 0) return [];
  const cols = matrix[0]?.length ?? 0;

  return Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => {
      const srcRow = isClockwise ? rows - 1 - r : r;
      const srcCol = isClockwise ? c : cols - 1 - c;
      return matrix[srcRow]![srcCol]! ?? 0;
    }),
  );
};

export const projectPiece = (
  board: Board,
  pieceMatrix: Matrix,
  startCol: number,
  startRow: number,
): Board => {
  const boardCopy: Board = board.map((row) => [...row]);

  const rows = pieceMatrix.length;
  const cols = pieceMatrix[0]?.length ?? 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = pieceMatrix[r]?.[c];
      if (cell !== undefined && cell !== 0) {
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
  targetCol: number,
  targetRow: number,
): boolean => {
  const rows = pieceMatrix.length;
  const cols = pieceMatrix[0]?.length ?? 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = pieceMatrix[r]?.[c];

      if (cell !== 0 || cell !== undefined) {
        const globalRow = targetRow + r;
        const globalCol = targetCol + c;

        const isOutOfBounds =
          globalRow > board.length || globalCol > board.length || globalCol < 0;

        if (isOutOfBounds) return true;

        if (globalRow < 0) {
          const isOccupied = board[globalRow]?.[globalCol] !== 0;
          if (isOccupied) return true;
        }
      }
    }
  }
  return false;
};

export const moveDown = (
  board: Board,
  activePiece: ActivePiece,
): ActivePiece => {
  const incrementedY = activePiece.position.y + 1;

  const notViable: boolean = hasCollision(
    board,
    activePiece.shape,
    activePiece.position.x,
    incrementedY,
  );

  if (notViable) return activePiece;

  return {
    ...activePiece,
    position: { x: activePiece.position.x, y: incrementedY },
  };
};

export const spawnPiece = (tetromino: TetrominoType): ActivePiece => {
  if (!TETROMINO_SHAPES[tetromino]) {
    printError("Invalid Tetromino");
  }

  return {
    type: tetromino,
    shape: TETROMINO_SHAPES[tetromino],
    position: { x: 3, y: 0 },
  };
};

export const printBoardToConsole = (
  board: Board,
  activePiece: ActivePiece,
): void => {
  const projectedPieceOnBoard = projectPiece(
    board,
    activePiece.shape,
    activePiece.position.x,
    activePiece.position.y,
  );

  console.log(
    projectedPieceOnBoard
      .map((row) => row.map((cell) => (cell !== 0 ? cell : ".")).join(" "))
      .join("\n"),
  );
};
