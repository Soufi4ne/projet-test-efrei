# Poker Hand Evaluator

Une bibliothèque TypeScript qui compare deux mains de poker et détermine laquelle a la meilleure combinaison, en suivant les règles officielles du poker.

## Fonctionnalités

- Identification et classement d'une main de 5 cartes selon la hiérarchie officielle du poker
- Comparaison de deux mains pour déterminer laquelle est la plus forte
- Gestion des cas d'égalité avec application des règles de départage

## Installation

```bash
npm install
```

## Utilisation

```typescript
import { compareHands } from 'poker-hand-evaluator';

// Exemple de mains de poker
const hand1 = [
  { value: '10', suit: 'HEARTS' },
  { value: 'J', suit: 'HEARTS' },
  { value: 'Q', suit: 'HEARTS' },
  { value: 'K', suit: 'HEARTS' },
  { value: 'A', suit: 'HEARTS' }
];

const hand2 = [
  { value: '10', suit: 'CLUBS' },
  { value: '10', suit: 'DIAMONDS' },
  { value: '10', suit: 'HEARTS' },
  { value: '10', suit: 'SPADES' },
  { value: 'A', suit: 'HEARTS' }
];

const result = compareHands(hand1, hand2);
console.log(result); // 1 si hand1 est meilleure, -1 si hand2 est meilleure, 0 si égalité
```

## Tests

```bash
npm test
```

## Développement

Ce projet a été développé en suivant une approche TDD (Test-Driven Development) et en respectant les principes SOLID et Clean Code.

## Licence

ISC 