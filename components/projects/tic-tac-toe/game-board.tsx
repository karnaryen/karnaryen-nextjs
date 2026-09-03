import styles from './tic-tac-toe.module.css';
import type { Board } from './types';

interface GameBoardProps {
  board: Board;
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
}

export function GameBoard({ onSelectSquare, board }: GameBoardProps) {
  return (
    <ol className={styles.gameBoard}>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  type="button"
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
