import { useTranslations } from 'next-intl';

import styles from './tic-tac-toe.module.css';

interface GameOverProps {
  /** Name of the winning player, or undefined when the game is a draw. */
  winner?: string;
  onRestart: () => void;
}

export function GameOver({ winner, onRestart }: GameOverProps) {
  const t = useTranslations('TicTacToeGame');

  return (
    <div className={styles.gameOver}>
      <h2>{t('gameOver')}</h2>
      {winner && <p>{t('won', { winner })}</p>}
      {!winner && <p>{t('draw')}</p>}
      <p>
        <button type="button" onClick={onRestart}>
          {t('rematch')}
        </button>
      </p>
    </div>
  );
}
