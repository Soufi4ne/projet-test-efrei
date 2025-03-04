
export enum Suit {
  HEARTS = 'HEARTS',     // Cœur
  DIAMONDS = 'DIAMONDS', // Carreau
  CLUBS = 'CLUBS',       // Trèfle
  SPADES = 'SPADES'      // Pique
}


export const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;


export type CardValue = typeof CARD_VALUES[number];


export const CARD_STRENGTH: Record<CardValue, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
};


export enum HandRank {
  HIGH_CARD = 0,        // Carte haute
  ONE_PAIR = 1,         // Paire
  TWO_PAIR = 2,         // Deux paires
  THREE_OF_A_KIND = 3,  // Brelan
  STRAIGHT = 4,         // Quinte (Suite)
  FLUSH = 5,            // Couleur
  FULL_HOUSE = 6,       // Full
  FOUR_OF_A_KIND = 7,   // Carré
  STRAIGHT_FLUSH = 8,   // Quinte Flush
  ROYAL_FLUSH = 9       // Quinte Flush Royale
} 