import { ComparisonResult, Hand } from './types';
import { evaluateHand } from './handEvaluator';

export function compareHands(hand1: Hand, hand2: Hand): ComparisonResult {
  const evaluation1 = evaluateHand(hand1);
  const evaluation2 = evaluateHand(hand2);
  
  if (evaluation1.rank > evaluation2.rank) {
    return 1;
  } else if (evaluation1.rank < evaluation2.rank) {
    return -1;
  }
  
  const tieBreakers1 = evaluation1.tieBreakers;
  const tieBreakers2 = evaluation2.tieBreakers;
  
  for (let i = 0; i < tieBreakers1.length; i++) {
    if (tieBreakers1[i] > tieBreakers2[i]) {
      return 1;
    } else if (tieBreakers1[i] < tieBreakers2[i]) {
      return -1;
    }
  }
  
  return 0;
}