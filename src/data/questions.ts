import { Question, Difficulty, GrammarPoint } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: '1',
    sentence: "______ tired, she still finished the report.",
    options: [
      { id: 'a', text: 'Feeling', isCorrect: true },
      { id: 'b', text: 'Felt', isCorrect: false },
      { id: 'c', text: 'To feel', isCorrect: false },
      { id: 'd', text: 'Feel', isCorrect: false }
    ],
    correctAnswer: 'Feeling',
    explanation: {
      rule: "现在分词作状语，表示伴随或原因。主语 she 与 feel 之间是主动关系，故用 feeling。",
      example: "Feeling hungry, I went to find something to eat.",
      commonMistake: "误用过去分词 Felt，过去分词通常表示被动或完成。",
      translation: "虽然感到疲倦，她还是完成了报告。"
    },
    difficulty: Difficulty.MIDDLE,
    category: GrammarPoint.NON_FINITE
  },
  {
    id: '2',
    sentence: "The boy ______ is standing there is my brother.",
    options: [
      { id: 'a', text: 'which', isCorrect: false },
      { id: 'b', text: 'who', isCorrect: true },
      { id: 'c', text: 'whom', isCorrect: false },
      { id: 'd', text: 'whose', isCorrect: false }
    ],
    correctAnswer: 'who',
    explanation: {
      rule: "定语从句引导词。先行词是人（The boy），且在从句中作主语，应使用 who。",
      example: "The girl who won the race is my friend.",
      commonMistake: "误用 which，which 用于指代物。",
      translation: "站在那里的那个男孩是我弟弟。"
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarPoint.RELATIVE_CLAUSE
  },
  {
    id: '3',
    sentence: "I won't go to the party ______ I am invited.",
    options: [
      { id: 'a', text: 'if', isCorrect: false },
      { id: 'b', text: 'unless', isCorrect: true },
      { id: 'c', text: 'because', isCorrect: false },
      { id: 'd', text: 'since', isCorrect: false }
    ],
    correctAnswer: 'unless',
    explanation: {
      rule: "unless 意为 '除非'，引导条件状语从句，相当于 if...not。",
      example: "You will fail unless you work hard.",
      commonMistake: "误用 if，if 表示 '如果'，语义不通。",
      translation: "除非我受到邀请，否则我不会去参加聚会。"
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarPoint.ADVERBIAL_CLAUSE
  },
  {
    id: '4',
    sentence: "The work ______, they went home.",
    options: [
      { id: 'a', text: 'finished', isCorrect: false },
      { id: 'b', text: 'finishing', isCorrect: false },
      { id: 'c', text: 'having finished', isCorrect: false },
      { id: 'd', text: 'having been finished', isCorrect: true }
    ],
    correctAnswer: 'having been finished',
    explanation: {
      rule: "独立主格结构。work 与 finish 是被动关系，且动作发生在 went home 之前，故用完成被动式。",
      example: "The meeting having been cancelled, we all went home.",
      commonMistake: "误用 finished，虽然表示被动，但无法体现动作的先后顺序。",
      translation: "工作完成后，他们回家了。"
    },
    difficulty: Difficulty.SENIOR,
    category: GrammarPoint.ABSOLUTE_CONSTRUCTION
  },
  {
    id: '5',
    sentence: "Do you know ______ he will come back?",
    options: [
      { id: 'a', text: 'when', isCorrect: true },
      { id: 'b', text: 'that', isCorrect: false },
      { id: 'c', text: 'which', isCorrect: false },
      { id: 'd', text: 'who', isCorrect: false }
    ],
    correctAnswer: 'when',
    explanation: {
      rule: "宾语从句。根据语境询问时间，应使用连接副词 when。",
      example: "I don't know when the train leaves.",
      commonMistake: "误用 that，that 仅起连接作用，不充当成分且无实际意义。",
      translation: "你知道他什么时候回来吗？"
    },
    difficulty: Difficulty.MIDDLE,
    category: GrammarPoint.NOUN_CLAUSE
  }
];
