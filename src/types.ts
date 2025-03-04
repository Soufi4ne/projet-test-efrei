import { CardValue, Suit, HandRank } from './constants';


export interface Card {
  value: CardValue;
  suit: Suit;
}


export type Hand = [Card, Card, Card, Card, Card];


export interface HandEvaluation {
  rank: HandRank;
  hand: Hand;
  tieBreakers: number[];
}


export type ComparisonResult = 1 | 0 | -1; 