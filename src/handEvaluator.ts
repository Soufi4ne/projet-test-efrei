import { CARD_STRENGTH, HandRank } from './constants';
import { Card, Hand, HandEvaluation } from './types';

export function isValidHand(hand: Hand): boolean {
  if (hand.length !== 5) {
    return false;
  }

  const seen = new Set<string>();
  for (const card of hand) {
    const cardKey = `${card.value}-${card.suit}`;
    if (seen.has(cardKey)) {
      return false;
    }
    seen.add(cardKey);
  }

  return true;
}

export function evaluateHand(hand: Hand): HandEvaluation {
  if (!isValidHand(hand)) {
    throw new Error('Invalid hand');
  }

  return {
    rank: HandRank.HIGH_CARD,
    hand,
    tieBreakers: []
  };
} 