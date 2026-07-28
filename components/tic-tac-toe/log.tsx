import { useTranslations } from 'next-intl';

import styles from './tic-tac-toe.module.css';
import type { Turn } from './types';

interface LogProps {
  turns: Turn[];
}

export function Log({ turns }: LogProps) {
  const t = useTranslations('TicTacToeGame');

  return (
    <ol className={styles.log}>
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {t('logEntry', {
            player: turn.player,
            row: turn.square.row,
            col: turn.square.col,
          })}
        </li>
      ))}
    </ol>
  );
}
