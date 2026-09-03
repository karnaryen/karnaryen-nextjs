import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import styles from './tic-tac-toe.module.css';
import type { PlayerSymbol } from './types';

interface PlayerProps {
  initialName: string;
  symbol: PlayerSymbol;
  isActive: boolean;
  onChangeName: (symbol: PlayerSymbol, newName: string) => void;
}

export function Player({ initialName, symbol, isActive, onChangeName }: PlayerProps) {
  const t = useTranslations('TicTacToeGame');
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className={styles.playerName}>{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleChange}
        aria-label={t('playerNameLabel', { symbol })}
      />
    );
  }

  return (
    <li className={cn(isActive && styles.active)}>
      <span className={styles.player}>
        {editablePlayerName}
        <span className={styles.playerSymbol}>{symbol}</span>
      </span>
      <button type="button" onClick={handleEditClick}>
        {isEditing ? t('save') : t('edit')}
      </button>
    </li>
  );
}
