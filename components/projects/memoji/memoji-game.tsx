'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import styles from './memoji-game.module.css';

/**
 * Memory game ported from the legacy site. To scale it, adjust PAIR_COUNT
 * and add matching `.emoji<n>` sprite classes in `memoji-game.module.css`
 * (sprite sheet lives in `public/projects/memoji/`), or change GAME_SECONDS
 * for a different time limit.
 */
const PAIR_COUNT = 6;
const CARD_COUNT = PAIR_COUNT * 2;
const GAME_SECONDS = 60;

type CardStatus = 'closed' | 'opened' | 'success' | 'failure';
type GameResult = 'win' | 'lose';

function shuffledEmojis(): number[] {
  const emojis = Array.from({ length: CARD_COUNT }, (_, i) => (i % PAIR_COUNT) + 1);
  for (let i = emojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }
  return emojis;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function MemojiGame() {
  const t = useTranslations('MemojiGame');
  // Emojis are dealt on the first flip (like the original), which also keeps
  // the server-rendered markup free of randomness.
  const [emojis, setEmojis] = useState<number[] | null>(null);
  const [statuses, setStatuses] = useState<CardStatus[]>(() =>
    Array<CardStatus>(CARD_COUNT).fill('closed'),
  );
  const [secondsLeft, setSecondsLeft] = useState(GAME_SECONDS);

  // Win/lose are derived, not stored: the game is won when every card is
  // matched and lost when the clock runs out first.
  const won = emojis !== null && statuses.every((status) => status === 'success');
  const lost = emojis !== null && !won && secondsLeft <= 0;
  const result: GameResult | null = won ? 'win' : lost ? 'lose' : null;
  const running = emojis !== null && result === null;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  function flipCard(index: number) {
    if (result) return;
    let board = emojis;
    if (!board) {
      board = shuffledEmojis();
      setEmojis(board);
    }

    setStatuses((prev) => {
      if (prev[index] !== 'closed') return prev;
      const next = [...prev];
      // Cards flipped but not yet matched ('failure' pairs stay face up
      // until the next flip, exactly like the original game).
      const active = prev
        .map((status, i) => i)
        .filter((i) => prev[i] === 'opened' || prev[i] === 'failure');

      if (active.length === 2) {
        for (const i of active) next[i] = 'closed';
        next[index] = 'opened';
      } else if (active.length === 1) {
        const match = board[index] === board[active[0]];
        next[index] = next[active[0]] = match ? 'success' : 'failure';
      } else {
        next[index] = 'opened';
      }
      return next;
    });
  }

  function playAgain() {
    setStatuses(Array<CardStatus>(CARD_COUNT).fill('closed'));
    setEmojis(null);
    setSecondsLeft(GAME_SECONDS);
  }

  return (
    <div className={styles.game}>
      <ul className={styles.cards}>
        {Array.from({ length: CARD_COUNT }, (_, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => flipCard(index)}
              aria-label={t('cardLabel', { number: index + 1 })}
              className={cn(
                styles.card,
                statuses[index] !== 'closed' && styles.opened,
                statuses[index] === 'success' && styles.success,
                statuses[index] === 'failure' && styles.failure,
              )}
            >
              <span className={cn(styles.face, styles.faceFront)} />
              <span
                className={cn(
                  styles.face,
                  styles.faceBack,
                  emojis && styles[`emoji${emojis[index]}`],
                )}
              >
                <span className={styles.memoji} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.timer} role="timer">
        {formatTime(Math.max(secondsLeft, 0))}
      </div>

      {result && (
        <div className={styles.message}>
          <div className={styles.messageBox}>
            <div className={styles.messageStatus} aria-live="assertive">
              {[...t(result)].map((letter, i) => (
                <span
                  key={i}
                  className={styles.messageLetter}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {letter === ' ' ? ' ' : letter}
                </span>
              ))}
            </div>
            <button type="button" className={styles.messageBtn} onClick={playAgain}>
              {t(result === 'win' ? 'playAgain' : 'tryAgain')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
