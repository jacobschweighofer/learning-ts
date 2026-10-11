export type EmptyCell = 0;
export type BlockCell = "I" | "O" | "T";

export type CellState = EmptyCell | BlockCell;
export type Board = CellState[][];

const createEmptyBoard = (rows: number, cols: number): Board => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, (): CellState => 0),
  );
};

const newBoard = createEmptyBoard(5, 5);

console.log(newBoard);
