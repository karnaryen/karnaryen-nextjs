'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { GameBoard } from './game-board';
import { GameOver } from './game-over';
import { Log } from './log';
import { Player } from './player';
import styles from './tic-tac-toe.module.css';
import type { Board, Players, PlayerSymbol, Turn } from './types';
import { WINNING_COMBINATIONS } from './winning-combinations';

/**
 * Two-player tic-tac-toe ported from the legacy site. The whole game state is
 * the list of turns; the board, the active player and the winner are derived
 * from it on every render.
 */
const INITIAL_GAME_BOARD: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: Turn[]): PlayerSymbol {
  let currentPlayer: PlayerSymbol = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns: Turn[]): Board {
  const gameBoard = INITIAL_GAME_BOARD.map((array) => [...array]);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard: Board, players: Players): string | undefined {
  let winner: string | undefined;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

export function TicTacToeGame() {
  const t = useTranslations('TicTacToeGame');
  const initialPlayers: Players = { X: t('player1'), O: t('player2') };

  const [players, setPlayers] = useState<Players>(initialPlayers);
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns: Turn[] = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: PlayerSymbol, newName: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <div className={styles.ticTacToe}>
      <div className={styles.gameContainer}>
        <ol className={styles.players}>
          <Player
            initialName={initialPlayers.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={initialPlayers.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {(winner !== undefined || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </div>
  );
}
