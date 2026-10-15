import {
  createNewBoard,
  rotate,
  projectPiece,
  moveDown,
  printBoardToConsole,
} from "./engine.js";
import type { Board, Matrix, ActivePiece } from "./tetrominoes.js";
import { TETROMINO_SHAPES } from "./matrix.js";

const newBoard = createNewBoard(10, 20);

const currentPiece: ActivePiece = {
  type: "J",
  shape: TETROMINO_SHAPES["J"],
  position: { x: 0, y: 0 },
};

printBoardToConsole(newBoard, currentPiece);
