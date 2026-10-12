export type EmptyCell = 0;
export type BlockCell = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export type CellState = EmptyCell | BlockCell;

export type Board = CellState[][];

const createNewBoard = (rows: number, cols: number) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, (): CellState => 0),
  );
