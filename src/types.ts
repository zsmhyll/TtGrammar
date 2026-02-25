export enum Difficulty {
  JUNIOR = '初级',
  MIDDLE = '中级',
  SENIOR = '高级'
}

export enum GrammarPoint {
  NON_FINITE = '非谓语动词',
  RELATIVE_CLAUSE = '定语从句',
  ADVERBIAL_CLAUSE = '状语从句',
  NOUN_CLAUSE = '名词性从句',
  CONJUNCTION = '连词辨析',
  ABSOLUTE_CONSTRUCTION = '独立主格'
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  sentence: string; // Use "______" for blanks
  options: Option[];
  correctAnswer: string;
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
    translation: string;
  };
  difficulty: Difficulty;
  category: GrammarPoint;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}
