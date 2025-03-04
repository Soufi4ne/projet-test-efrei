import { describe, it, expect } from 'vitest';
import { Suit } from '../src/constants';
import { Hand } from '../src/types';
import { compareHands } from '../src/handComparator';

describe('Hand Comparator', () => {
  it('should determine that a Royal Flush beats a Straight Flush', () => {
    const royalFlush: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.HEARTS },
      { value: 'Q', suit: Suit.HEARTS },
      { value: 'J', suit: Suit.HEARTS },
      { value: '10', suit: Suit.HEARTS }
    ];
    
    const straightFlush: Hand = [
      { value: '9', suit: Suit.CLUBS },
      { value: '8', suit: Suit.CLUBS },
      { value: '7', suit: Suit.CLUBS },
      { value: '6', suit: Suit.CLUBS },
      { value: '5', suit: Suit.CLUBS }
    ];
    
    expect(compareHands(royalFlush, straightFlush)).toBe(1);
    expect(compareHands(straightFlush, royalFlush)).toBe(-1);
  });

  it('should determine that a Straight Flush beats Four of a Kind', () => {
    const straightFlush: Hand = [
      { value: '9', suit: Suit.CLUBS },
      { value: '8', suit: Suit.CLUBS },
      { value: '7', suit: Suit.CLUBS },
      { value: '6', suit: Suit.CLUBS },
      { value: '5', suit: Suit.CLUBS }
    ];
    
    const fourOfAKind: Hand = [
      { value: '8', suit: Suit.HEARTS },
      { value: '8', suit: Suit.DIAMONDS },
      { value: '8', suit: Suit.CLUBS },
      { value: '8', suit: Suit.SPADES },
      { value: 'K', suit: Suit.HEARTS }
    ];
    
    expect(compareHands(straightFlush, fourOfAKind)).toBe(1);
    expect(compareHands(fourOfAKind, straightFlush)).toBe(-1);
  });

  it('should determine that a higher Straight Flush beats a lower one', () => {
    const higherStraightFlush: Hand = [
      { value: 'K', suit: Suit.CLUBS },
      { value: 'Q', suit: Suit.CLUBS },
      { value: 'J', suit: Suit.CLUBS },
      { value: '10', suit: Suit.CLUBS },
      { value: '9', suit: Suit.CLUBS }
    ];
    
    const lowerStraightFlush: Hand = [
      { value: '9', suit: Suit.HEARTS },
      { value: '8', suit: Suit.HEARTS },
      { value: '7', suit: Suit.HEARTS },
      { value: '6', suit: Suit.HEARTS },
      { value: '5', suit: Suit.HEARTS }
    ];
    
    expect(compareHands(higherStraightFlush, lowerStraightFlush)).toBe(1);
    expect(compareHands(lowerStraightFlush, higherStraightFlush)).toBe(-1);
  });

  it('should determine that a higher Four of a Kind beats a lower one', () => {
    const higherFourOfAKind: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'A', suit: Suit.DIAMONDS },
      { value: 'A', suit: Suit.CLUBS },
      { value: 'A', suit: Suit.SPADES },
      { value: '2', suit: Suit.HEARTS }
    ];
    
    const lowerFourOfAKind: Hand = [
      { value: 'K', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.DIAMONDS },
      { value: 'K', suit: Suit.CLUBS },
      { value: 'K', suit: Suit.SPADES },
      { value: 'A', suit: Suit.HEARTS }
    ];
    
    expect(compareHands(higherFourOfAKind, lowerFourOfAKind)).toBe(1);
    expect(compareHands(lowerFourOfAKind, higherFourOfAKind)).toBe(-1);
  });

  it('should use kicker to break tie in Four of a Kind', () => {
    const fourOfAKindHigherKicker: Hand = [
      { value: '8', suit: Suit.HEARTS },
      { value: '8', suit: Suit.DIAMONDS },
      { value: '8', suit: Suit.CLUBS },
      { value: '8', suit: Suit.SPADES },
      { value: 'A', suit: Suit.HEARTS }
    ];
    
    const fourOfAKindLowerKicker: Hand = [
      { value: '8', suit: Suit.HEARTS },
      { value: '8', suit: Suit.DIAMONDS },
      { value: '8', suit: Suit.CLUBS },
      { value: '8', suit: Suit.SPADES },
      { value: 'K', suit: Suit.HEARTS }
    ];
    
    expect(compareHands(fourOfAKindHigherKicker, fourOfAKindLowerKicker)).toBe(1);
    expect(compareHands(fourOfAKindLowerKicker, fourOfAKindHigherKicker)).toBe(-1);
  });

  it('should determine that a Full House beats a Flush', () => {
    const fullHouse: Hand = [
      { value: '7', suit: Suit.HEARTS },
      { value: '7', suit: Suit.DIAMONDS },
      { value: '7', suit: Suit.CLUBS },
      { value: 'J', suit: Suit.SPADES },
      { value: 'J', suit: Suit.HEARTS }
    ];
    
    const flush: Hand = [
      { value: 'A', suit: Suit.DIAMONDS },
      { value: 'J', suit: Suit.DIAMONDS },
      { value: '9', suit: Suit.DIAMONDS },
      { value: '6', suit: Suit.DIAMONDS },
      { value: '3', suit: Suit.DIAMONDS }
    ];
    
    expect(compareHands(fullHouse, flush)).toBe(1);
    expect(compareHands(flush, fullHouse)).toBe(-1);
  });

  it('should determine that a higher Full House beats a lower one', () => {
    const higherFullHouse: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'A', suit: Suit.DIAMONDS },
      { value: 'A', suit: Suit.CLUBS },
      { value: '2', suit: Suit.SPADES },
      { value: '2', suit: Suit.HEARTS }
    ];
    
    const lowerFullHouse: Hand = [
      { value: 'K', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.DIAMONDS },
      { value: 'K', suit: Suit.CLUBS },
      { value: 'A', suit: Suit.SPADES },
      { value: 'A', suit: Suit.HEARTS }
    ];
    
    expect(compareHands(higherFullHouse, lowerFullHouse)).toBe(1);
    expect(compareHands(lowerFullHouse, higherFullHouse)).toBe(-1);
  });

  it('should determine that a higher Flush beats a lower one', () => {
    const higherFlush: Hand = [
      { value: 'A', suit: Suit.DIAMONDS },
      { value: 'Q', suit: Suit.DIAMONDS },
      { value: '9', suit: Suit.DIAMONDS },
      { value: '6', suit: Suit.DIAMONDS },
      { value: '3', suit: Suit.DIAMONDS }
    ];
    
    const lowerFlush: Hand = [
      { value: 'K', suit: Suit.HEARTS },
      { value: 'Q', suit: Suit.HEARTS },
      { value: '9', suit: Suit.HEARTS },
      { value: '6', suit: Suit.HEARTS },
      { value: '3', suit: Suit.HEARTS }
    ];
    
    expect(compareHands(higherFlush, lowerFlush)).toBe(1);
    expect(compareHands(lowerFlush, higherFlush)).toBe(-1);
  });

  it('should determine that a higher Straight beats a lower one', () => {
    const higherStraight: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.CLUBS },
      { value: 'Q', suit: Suit.DIAMONDS },
      { value: 'J', suit: Suit.SPADES },
      { value: '10', suit: Suit.HEARTS }
    ];
    
    const lowerStraight: Hand = [
      { value: '9', suit: Suit.HEARTS },
      { value: '8', suit: Suit.CLUBS },
      { value: '7', suit: Suit.DIAMONDS },
      { value: '6', suit: Suit.SPADES },
      { value: '5', suit: Suit.HEARTS }
    ];
    
    expect(compareHands(higherStraight, lowerStraight)).toBe(1);
    expect(compareHands(lowerStraight, higherStraight)).toBe(-1);
  });

  it('should handle the special case of A-5 straight vs other straights', () => {
    const lowStraight: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: '2', suit: Suit.CLUBS },
      { value: '3', suit: Suit.DIAMONDS },
      { value: '4', suit: Suit.SPADES },
      { value: '5', suit: Suit.HEARTS }
    ];
    
    const higherStraight: Hand = [
      { value: '6', suit: Suit.HEARTS },
      { value: '5', suit: Suit.CLUBS },
      { value: '4', suit: Suit.DIAMONDS },
      { value: '3', suit: Suit.SPADES },
      { value: '2', suit: Suit.HEARTS }
    ];
    
    expect(compareHands(higherStraight, lowStraight)).toBe(1);
    expect(compareHands(lowStraight, higherStraight)).toBe(-1);
  });

  it('should determine that identical hands are equal', () => {
    const hand1: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.HEARTS },
      { value: 'Q', suit: Suit.HEARTS },
      { value: 'J', suit: Suit.HEARTS },
      { value: '10', suit: Suit.HEARTS }
    ];
    
    const hand2: Hand = [
      { value: 'A', suit: Suit.DIAMONDS },
      { value: 'K', suit: Suit.DIAMONDS },
      { value: 'Q', suit: Suit.DIAMONDS },
      { value: 'J', suit: Suit.DIAMONDS },
      { value: '10', suit: Suit.DIAMONDS }
    ];
    
    expect(compareHands(hand1, hand2)).toBe(0);
  });
}); 