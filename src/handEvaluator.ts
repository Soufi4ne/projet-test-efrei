import { CARD_STRENGTH, HandRank, CardValue, Suit } from './constants';
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

function getCardStrengths(hand: Hand): number[] {
  return hand.map(card => CARD_STRENGTH[card.value]);
}

function getSortedCardStrengths(hand: Hand): number[] {
  return getCardStrengths(hand).sort((a, b) => b - a);
}

function getValueCounts(hand: Hand): Map<number, number> {
  const counts = new Map<number, number>();
  
  for (const card of hand) {
    const strength = CARD_STRENGTH[card.value];
    counts.set(strength, (counts.get(strength) || 0) + 1);
  }
  
  return counts;
}

function isFlush(hand: Hand): boolean {
  const firstSuit = hand[0].suit;
  return hand.every(card => card.suit === firstSuit);
}

function isStraight(strengths: number[]): boolean {
  const sorted = [...strengths].sort((a, b) => b - a);
  
  if (sorted[0] === 14 && sorted[1] === 5 && sorted[2] === 4 && sorted[3] === 3 && sorted[4] === 2) {
    return true;
  }
  
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i-1] !== sorted[i] + 1) {
      return false;
    }
  }
  
  return true;
}

function isRoyalFlush(hand: Hand): boolean {
  if (!isFlush(hand)) return false;
  
  const values = new Set(hand.map(card => card.value));
  return values.has('10') && values.has('J') && values.has('Q') && values.has('K') && values.has('A');
}

function isStraightFlush(hand: Hand): boolean {
  return isFlush(hand) && isStraight(getCardStrengths(hand));
}

function isFourOfAKind(valueCounts: Map<number, number>): [boolean, number, number] {
  for (const [value, count] of valueCounts.entries()) {
    if (count === 4) {
      // Trouver le kicker
      for (const [kickerValue, kickerCount] of valueCounts.entries()) {
        if (kickerValue !== value) {
          return [true, value, kickerValue];
        }
      }
    }
  }
  
  return [false, 0, 0];
}

function isFullHouse(valueCounts: Map<number, number>): [boolean, number, number] {
  let threeOfAKindValue = 0;
  let pairValue = 0;
  
  for (const [value, count] of valueCounts.entries()) {
    if (count === 3) {
      threeOfAKindValue = value;
    } else if (count === 2) {
      pairValue = value;
    }
  }
  
  return [threeOfAKindValue > 0 && pairValue > 0, threeOfAKindValue, pairValue];
}

function isThreeOfAKind(valueCounts: Map<number, number>): [boolean, number, number[]] {
  let threeOfAKindValue = 0;
  const kickers: number[] = [];
  
  for (const [value, count] of valueCounts.entries()) {
    if (count === 3) {
      threeOfAKindValue = value;
    } else {
      kickers.push(value);
    }
  }
  
  kickers.sort((a, b) => b - a);
  
  return [threeOfAKindValue > 0, threeOfAKindValue, kickers];
}

function isTwoPair(valueCounts: Map<number, number>): [boolean, number, number, number] {
  const pairs: number[] = [];
  let kicker = 0;
  
  for (const [value, count] of valueCounts.entries()) {
    if (count === 2) {
      pairs.push(value);
    } else {
      kicker = value;
    }
  }
  
  pairs.sort((a, b) => b - a);
  
  return [pairs.length === 2, pairs[0], pairs[1], kicker];
}

function isOnePair(valueCounts: Map<number, number>): [boolean, number, number[]] {
  let pairValue = 0;
  const kickers: number[] = [];
  
  for (const [value, count] of valueCounts.entries()) {
    if (count === 2) {
      pairValue = value;
    } else {
      kickers.push(value);
    }
  }
  
  kickers.sort((a, b) => b - a);
  
  return [pairValue > 0, pairValue, kickers];
}

export function evaluateHand(hand: Hand): HandEvaluation {
  if (!isValidHand(hand)) {
    throw new Error('Invalid hand');
  }

  const cardStrengths = getCardStrengths(hand);
  const sortedStrengths = getSortedCardStrengths(hand);
  const valueCounts = getValueCounts(hand);
  

  if (isRoyalFlush(hand)) {
    return {
      rank: HandRank.ROYAL_FLUSH,
      hand,
      tieBreakers: []
    };
  }
  
  if (isStraightFlush(hand)) {
    if (sortedStrengths[0] === 14 && sortedStrengths[1] === 5) {
      return {
        rank: HandRank.STRAIGHT_FLUSH,
        hand,
        tieBreakers: [5]
      };
    }
    
    return {
      rank: HandRank.STRAIGHT_FLUSH,
      hand,
      tieBreakers: [sortedStrengths[0]]
    };
  }
  
  const [hasFourOfAKind, fourValue, fourKicker] = isFourOfAKind(valueCounts);
  if (hasFourOfAKind) {
    return {
      rank: HandRank.FOUR_OF_A_KIND,
      hand,
      tieBreakers: [fourValue, fourKicker]
    };
  }
  
  const [hasFullHouse, threeValue, pairValue] = isFullHouse(valueCounts);
  if (hasFullHouse) {
    return {
      rank: HandRank.FULL_HOUSE,
      hand,
      tieBreakers: [threeValue, pairValue]
    };
  }
  
  if (isFlush(hand)) {
    return {
      rank: HandRank.FLUSH,
      hand,
      tieBreakers: sortedStrengths
    };
  }
  
  if (isStraight(cardStrengths)) {
    if (sortedStrengths[0] === 14 && sortedStrengths[1] === 5) {
      return {
        rank: HandRank.STRAIGHT,
        hand,
        tieBreakers: [5]
      };
    }
    
    return {
      rank: HandRank.STRAIGHT,
      hand,
      tieBreakers: [sortedStrengths[0]]
    };
  }
  
  const [hasThreeOfAKind, threeOfAKindValue, threeKickers] = isThreeOfAKind(valueCounts);
  if (hasThreeOfAKind) {
    return {
      rank: HandRank.THREE_OF_A_KIND,
      hand,
      tieBreakers: [threeOfAKindValue, ...threeKickers]
    };
  }
  
  const [hasTwoPair, highPair, lowPair, twoPairKicker] = isTwoPair(valueCounts);
  if (hasTwoPair) {
    return {
      rank: HandRank.TWO_PAIR,
      hand,
      tieBreakers: [highPair, lowPair, twoPairKicker]
    };
  }
  
  const [hasOnePair, onePairValue, onePairKickers] = isOnePair(valueCounts);
  if (hasOnePair) {
    return {
      rank: HandRank.ONE_PAIR,
      hand,
      tieBreakers: [onePairValue, ...onePairKickers]
    };
  }
  
  return {
    rank: HandRank.HIGH_CARD,
    hand,
    tieBreakers: sortedStrengths
  };
} 