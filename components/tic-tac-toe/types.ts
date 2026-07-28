export type PlayerSymbol = 'X' | 'O';

/** 3x3 grid; `null` means the square is still free. */
export type Board = (PlayerSymbol | null)[][];

export interface Turn {
  square: { row: number; col: number };
  player: PlayerSymbol;
}

export type Players = Record<PlayerSymbol, string>;
