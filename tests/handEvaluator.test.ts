import { describe, it, expect } from 'vitest';
import { Suit, HandRank } from '../src/constants';
import { Card, Hand } from '../src/types';
import { evaluateHand, isValidHand } from '../src/handEvaluator';

describe('Hand Validator', () => {
  it('should validate a correct hand with 5 cards', () => {
    const hand: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.HEARTS },
      { value: 'Q', suit: Suit.HEARTS },
      { value: 'J', suit: Suit.HEARTS },
      { value: '10', suit: Suit.HEARTS }
    ];
    
    expect(isValidHand(hand)).toBe(true);
  });

  it('should reject a hand with less than 5 cards', () => {
    const invalidHand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.HEARTS },
      { value: 'Q', suit: Suit.HEARTS },
      { value: 'J', suit: Suit.HEARTS }
    ];
    
    // @ts-expect-error
    expect(isValidHand(invalidHand)).toBe(false);
  });

  it('should reject a hand with duplicate cards', () => {
    const handWithDuplicates: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'A', suit: Suit.HEARTS },
      { value: 'Q', suit: Suit.HEARTS },
      { value: 'J', suit: Suit.HEARTS },
      { value: '10', suit: Suit.HEARTS }
    ];
    
    expect(isValidHand(handWithDuplicates)).toBe(false);
  });
});

describe('Hand Evaluator', () => {
  it('should identify a Royal Flush', () => {
    const royalFlush: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.HEARTS },
      { value: 'Q', suit: Suit.HEARTS },
      { value: 'J', suit: Suit.HEARTS },
      { value: '10', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(royalFlush);
    expect(evaluation.rank).toBe(HandRank.ROYAL_FLUSH);
  });

  it('should identify a Straight Flush', () => {
    const straightFlush: Hand = [
      { value: '9', suit: Suit.CLUBS },
      { value: '8', suit: Suit.CLUBS },
      { value: '7', suit: Suit.CLUBS },
      { value: '6', suit: Suit.CLUBS },
      { value: '5', suit: Suit.CLUBS }
    ];
    
    const evaluation = evaluateHand(straightFlush);
    expect(evaluation.rank).toBe(HandRank.STRAIGHT_FLUSH);
    expect(evaluation.tieBreakers[0]).toBe(9);
  });

  it('should identify Four of a Kind', () => {
    const fourOfAKind: Hand = [
      { value: '8', suit: Suit.HEARTS },
      { value: '8', suit: Suit.DIAMONDS },
      { value: '8', suit: Suit.CLUBS },
      { value: '8', suit: Suit.SPADES },
      { value: 'K', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(fourOfAKind);
    expect(evaluation.rank).toBe(HandRank.FOUR_OF_A_KIND);
    expect(evaluation.tieBreakers[0]).toBe(8);
    expect(evaluation.tieBreakers[1]).toBe(13);
  });

  it('should identify a Full House', () => {
    const fullHouse: Hand = [
      { value: '7', suit: Suit.HEARTS },
      { value: '7', suit: Suit.DIAMONDS },
      { value: '7', suit: Suit.CLUBS },
      { value: 'J', suit: Suit.SPADES },
      { value: 'J', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(fullHouse);
    expect(evaluation.rank).toBe(HandRank.FULL_HOUSE);
    expect(evaluation.tieBreakers[0]).toBe(7);
    expect(evaluation.tieBreakers[1]).toBe(11);
  });

  it('should identify a Flush', () => {
    const flush: Hand = [
      { value: 'A', suit: Suit.DIAMONDS },
      { value: 'J', suit: Suit.DIAMONDS },
      { value: '9', suit: Suit.DIAMONDS },
      { value: '6', suit: Suit.DIAMONDS },
      { value: '3', suit: Suit.DIAMONDS }
    ];
    
    const evaluation = evaluateHand(flush);
    expect(evaluation.rank).toBe(HandRank.FLUSH);
    expect(evaluation.tieBreakers).toEqual([14, 11, 9, 6, 3]);
  });

  it('should identify a Straight', () => {
    const straight: Hand = [
      { value: '9', suit: Suit.HEARTS },
      { value: '8', suit: Suit.CLUBS },
      { value: '7', suit: Suit.DIAMONDS },
      { value: '6', suit: Suit.SPADES },
      { value: '5', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(straight);
    expect(evaluation.rank).toBe(HandRank.STRAIGHT);
    expect(evaluation.tieBreakers[0]).toBe(9);
  });

  it('should identify Three of a Kind', () => {
    const threeOfAKind: Hand = [
      { value: 'Q', suit: Suit.HEARTS },
      { value: 'Q', suit: Suit.DIAMONDS },
      { value: 'Q', suit: Suit.CLUBS },
      { value: '9', suit: Suit.SPADES },
      { value: '2', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(threeOfAKind);
    expect(evaluation.rank).toBe(HandRank.THREE_OF_A_KIND);
    expect(evaluation.tieBreakers[0]).toBe(12);
    expect(evaluation.tieBreakers[1]).toBe(9);
    expect(evaluation.tieBreakers[2]).toBe(2);
  });

  it('should identify Two Pair', () => {
    const twoPair: Hand = [
      { value: 'K', suit: Suit.HEARTS },
      { value: 'K', suit: Suit.DIAMONDS },
      { value: '6', suit: Suit.CLUBS },
      { value: '6', suit: Suit.SPADES },
      { value: 'A', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(twoPair);
    expect(evaluation.rank).toBe(HandRank.TWO_PAIR);
    expect(evaluation.tieBreakers[0]).toBe(13);
    expect(evaluation.tieBreakers[1]).toBe(6);
    expect(evaluation.tieBreakers[2]).toBe(14);
  });

  it('should identify One Pair', () => {
    const onePair: Hand = [
      { value: '10', suit: Suit.HEARTS },
      { value: '10', suit: Suit.DIAMONDS },
      { value: 'A', suit: Suit.CLUBS },
      { value: '7', suit: Suit.SPADES },
      { value: '3', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(onePair);
    expect(evaluation.rank).toBe(HandRank.ONE_PAIR);
    expect(evaluation.tieBreakers[0]).toBe(10);
    expect(evaluation.tieBreakers[1]).toBe(14);
    expect(evaluation.tieBreakers[2]).toBe(7);
    expect(evaluation.tieBreakers[3]).toBe(3);
  });

  it('should identify High Card', () => {
    const highCard: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: 'J', suit: Suit.DIAMONDS },
      { value: '9', suit: Suit.CLUBS },
      { value: '7', suit: Suit.SPADES },
      { value: '2', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(highCard);
    expect(evaluation.rank).toBe(HandRank.HIGH_CARD);
    expect(evaluation.tieBreakers).toEqual([14, 11, 9, 7, 2]);
  });

  it('should handle the special case of A-5 straight', () => {
    const lowStraight: Hand = [
      { value: 'A', suit: Suit.HEARTS },
      { value: '2', suit: Suit.DIAMONDS },
      { value: '3', suit: Suit.CLUBS },
      { value: '4', suit: Suit.SPADES },
      { value: '5', suit: Suit.HEARTS }
    ];
    
    const evaluation = evaluateHand(lowStraight);
    expect(evaluation.rank).toBe(HandRank.STRAIGHT);
    expect(evaluation.tieBreakers[0]).toBe(5);
  });
}); 