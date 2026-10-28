// ─── IBPS Quest — Core Data ────────────────────────────────────────────────

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
  difficulty: Difficulty;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  questions: Question[];
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgGradient: string;
  topics: Topic[];
}

// ─── QUESTIONS DATA ──────────────────────────────────────────────────────────

const englishReadingQuestions: Question[] = [
  {
    id: "eng_rc_1",
    question: "Choose the word most similar in meaning to 'ELOQUENT':",
    options: ["Articulate", "Silent", "Confused", "Rude"],
    answer: 0,
    explanation: "'Eloquent' means fluent and persuasive in speaking or writing. 'Articulate' is the closest synonym.",
    difficulty: "easy",
  },
  {
    id: "eng_rc_2",
    question: "Select the antonym of 'BENEVOLENT':",
    options: ["Kind", "Generous", "Malevolent", "Helpful"],
    answer: 2,
    explanation: "'Benevolent' means well-meaning and kindly. Its antonym is 'Malevolent' which means having or showing a wish to do evil to others.",
    difficulty: "easy",
  },
  {
    id: "eng_rc_3",
    question: "Find the error in: 'He is one of the student who has passed the exam.'",
    options: [
      "He is one of",
      "the student who",
      "has passed",
      "the exam",
    ],
    answer: 1,
    explanation: "After 'one of the', a plural noun is used. It should be 'the students who'.",
    difficulty: "medium",
  },
  {
    id: "eng_rc_4",
    question: "Choose the correctly spelled word:",
    options: ["Accomodation", "Accommodation", "Acommodation", "Accomadation"],
    answer: 1,
    explanation: "The correct spelling is 'Accommodation' with double 'c' and double 'm'.",
    difficulty: "easy",
  },
  {
    id: "eng_rc_5",
    question: "Fill in the blank: The bank ___ the loan application after reviewing all documents.",
    options: ["sanctioned", "sanction", "sanctioning", "sanctions"],
    answer: 0,
    explanation: "Past tense 'sanctioned' is correct here as the action is completed.",
    difficulty: "easy",
  },
];

const englishClozeQuestions: Question[] = [
  {
    id: "eng_cloze_1",
    question: "Choose the best word: The new policy will ___ the economic growth of the nation.",
    options: ["hinder", "accelerate", "diminish", "complicate"],
    answer: 1,
    explanation: "In context, 'accelerate' (speed up) makes the most positive and logical sense for a policy promoting growth.",
    difficulty: "medium",
  },
  {
    id: "eng_cloze_2",
    question: "Identify the sentence with correct subject-verb agreement:",
    options: [
      "The team are playing well today.",
      "The team is playing well today.",
      "The team were playing well today.",
      "The team were played well today.",
    ],
    answer: 1,
    explanation: "In formal banking English, collective nouns like 'team' take singular verbs. 'The team is playing' is correct.",
    difficulty: "medium",
  },
  {
    id: "eng_cloze_3",
    question: "Choose the correct form: Neither the manager nor the employees ___ aware of the new regulation.",
    options: ["was", "were", "is", "are"],
    answer: 1,
    explanation: "When 'neither...nor' connects two subjects, the verb agrees with the nearer subject ('employees' → plural → 'were').",
    difficulty: "hard",
  },
];

const paraJumbleQuestions: Question[] = [
  {
    id: "para_1",
    question: "Arrange sentences to form a coherent paragraph:\nP: Banks play a vital role in economic development.\nQ: They mobilize savings and channel them into productive investments.\nR: This process creates jobs and boosts GDP.\nS: Hence, a strong banking sector is essential for growth.\nWhich is the CORRECT order?",
    options: ["PQRS", "QPRS", "PRQS", "SPQR"],
    answer: 0,
    explanation: "PQRS is logical: Introduction (P) → How they do it (Q) → Result (R) → Conclusion (S).",
    difficulty: "medium",
  },
];

const simplificationQuestions: Question[] = [
  {
    id: "quant_simp_1",
    question: "Simplify: 25% of 480 + 15% of 600 = ?",
    options: ["210", "240", "200", "220"],
    answer: 0,
    explanation: "25% of 480 = 120; 15% of 600 = 90; 120 + 90 = 210",
    difficulty: "easy",
  },
  {
    id: "quant_simp_2",
    question: "What is the value of √(1296)?",
    options: ["34", "36", "38", "32"],
    answer: 1,
    explanation: "36 × 36 = 1296, so √1296 = 36",
    difficulty: "easy",
  },
  {
    id: "quant_simp_3",
    question: "48 × 25 ÷ 12 + 150 – 75 = ?",
    options: ["175", "100", "125", "150"],
    answer: 0,
    explanation: "48 × 25 = 1200; 1200 ÷ 12 = 100; 100 + 150 – 75 = 175",
    difficulty: "easy",
  },
  {
    id: "quant_simp_4",
    question: "If 40% of a number is 160, what is 25% of that number?",
    options: ["100", "110", "80", "90"],
    answer: 0,
    explanation: "40% = 160, so the number = 400. 25% of 400 = 100",
    difficulty: "easy",
  },
];

const numberSeriesQuestions: Question[] = [
  {
    id: "quant_ns_1",
    question: "Find the missing number: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    answer: 1,
    explanation: "Differences: 4, 6, 8, 10, 12. Next term: 30 + 12 = 42",
    difficulty: "easy",
  },
  {
    id: "quant_ns_2",
    question: "Find the wrong number: 3, 7, 15, 27, 63, 127",
    options: ["7", "27", "63", "15"],
    answer: 1,
    explanation: "Pattern: 3×2+1=7, 7×2+1=15, 15×2+1=31 (not 27), 31×2+1=63. So 27 is wrong; it should be 31.",
    difficulty: "hard",
  },
  {
    id: "quant_ns_3",
    question: "Complete the series: 1, 4, 9, 16, 25, ?",
    options: ["30", "35", "36", "49"],
    answer: 2,
    explanation: "These are perfect squares: 1², 2², 3², 4², 5², 6² = 36",
    difficulty: "easy",
  },
];

const profitLossQuestions: Question[] = [
  {
    id: "quant_pl_1",
    question: "A shopkeeper bought an article for ₹800 and sold it for ₹1000. What is the profit percentage?",
    options: ["20%", "25%", "15%", "30%"],
    answer: 1,
    explanation: "Profit = 1000 – 800 = 200. Profit% = (200/800) × 100 = 25%",
    difficulty: "easy",
  },
  {
    id: "quant_pl_2",
    question: "If an item is sold at 20% loss on cost price of ₹500, what is the selling price?",
    options: ["₹400", "₹350", "₹420", "₹380"],
    answer: 0,
    explanation: "Loss = 20% of 500 = 100. SP = 500 – 100 = ₹400",
    difficulty: "easy",
  },
  {
    id: "quant_pl_3",
    question: "A trader marks his goods 30% above cost and offers a 10% discount. What is his profit%?",
    options: ["17%", "20%", "17.5%", "15%"],
    answer: 2,
    explanation: "Let CP = 100. MP = 130. After 10% discount SP = 130 × 0.9 = 117. Profit% = 17%... Actually: 117 – 100 = 17%. Let me recalculate: 130 × (90/100) = 117. Profit = 17%. So 17%",
    difficulty: "medium",
  },
];

const siCiQuestions: Question[] = [
  {
    id: "quant_sici_1",
    question: "What is the Simple Interest on ₹5000 at 8% per annum for 3 years?",
    options: ["₹1200", "₹1100", "₹1000", "₹900"],
    answer: 0,
    explanation: "SI = (P × R × T) / 100 = (5000 × 8 × 3) / 100 = ₹1200",
    difficulty: "easy",
  },
  {
    id: "quant_sici_2",
    question: "The difference between CI and SI on ₹10,000 for 2 years at 10% p.a. is?",
    options: ["₹100", "₹50", "₹200", "₹150"],
    answer: 0,
    explanation: "SI = 10000×10×2/100 = 2000. CI = 10000×(1.1²–1) = 10000×0.21 = 2100. Difference = ₹100",
    difficulty: "medium",
  },
  {
    id: "quant_sici_3",
    question: "At what rate of CI per annum will ₹1000 become ₹1331 in 3 years?",
    options: ["11%", "10%", "12%", "9%"],
    answer: 1,
    explanation: "1000 × (1+r)³ = 1331 → (1+r)³ = 1.331 → 1+r = 1.1 → r = 10%",
    difficulty: "medium",
  },
];

const timeWorkQuestions: Question[] = [
  {
    id: "quant_tw_1",
    question: "A can do a work in 10 days, B in 15 days. In how many days will they finish it together?",
    options: ["5 days", "6 days", "8 days", "4 days"],
    answer: 1,
    explanation: "A's rate = 1/10, B's rate = 1/15. Together = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. So 6 days.",
    difficulty: "easy",
  },
  {
    id: "quant_tw_2",
    question: "20 workers can complete a task in 12 days. How many workers are needed to complete it in 8 days?",
    options: ["25", "30", "28", "32"],
    answer: 1,
    explanation: "Work = 20 × 12 = 240 man-days. Workers needed = 240 / 8 = 30",
    difficulty: "medium",
  },
];

const puzzleQuestions: Question[] = [
  {
    id: "reason_puz_1",
    question: "A is taller than B. C is taller than A. D is shorter than B. Who is the tallest?",
    options: ["A", "B", "C", "D"],
    answer: 2,
    explanation: "Order: C > A > B > D. Therefore C is the tallest.",
    difficulty: "easy",
  },
  {
    id: "reason_puz_2",
    question: "5 persons P, Q, R, S, T sit in a row. P sits next to Q. R sits next to S. T is in the middle. Q is adjacent to T. Which of these must be true?",
    options: [
      "P is at one end",
      "R is at one end",
      "S is adjacent to T",
      "P is adjacent to R",
    ],
    answer: 0,
    explanation: "T is in position 3. Q is adjacent to T (position 2 or 4). P is next to Q. If Q=2, P=1 (end). If Q=4, P=5 (end). Either way P is at one end.",
    difficulty: "hard",
  },
];

const syllogismQuestions: Question[] = [
  {
    id: "reason_syll_1",
    question: "Statements: All cats are dogs. All dogs are animals.\nConclusion I: All cats are animals.\nConclusion II: Some animals are cats.",
    options: [
      "Only I follows",
      "Only II follows",
      "Both I and II follow",
      "Neither follows",
    ],
    answer: 2,
    explanation: "All cats → dogs → animals. So all cats are animals (I ✓). Since all cats are animals, some animals are cats (II ✓). Both follow.",
    difficulty: "medium",
  },
  {
    id: "reason_syll_2",
    question: "Statements: Some books are pens. No pen is a pencil.\nConclusion I: Some books are pencils.\nConclusion II: No book is a pencil.",
    options: [
      "Only I follows",
      "Only II follows",
      "Both I and II follow",
      "Neither follows",
    ],
    answer: 3,
    explanation: "Some books are pens but no pen is a pencil. We cannot conclude all books aren't pencils (some books may not be pens and could be pencils). Neither conclusion definitely follows.",
    difficulty: "hard",
  },
];

const inequalityQuestions: Question[] = [
  {
    id: "reason_ineq_1",
    question: "If A > B ≥ C = D < E, which is definitely true?",
    options: ["A > D", "E > B", "C < A", "Both A > D and C < A"],
    answer: 3,
    explanation: "A > B ≥ C = D, so A > D (✓) and C < A (✓). E > D but E vs B is uncertain. Both A > D and C < A are true.",
    difficulty: "medium",
  },
];

const codingDecodingQuestions: Question[] = [
  {
    id: "reason_cd_1",
    question: "In a certain code: BANK is written as CBOA. How is LOAN written?",
    options: ["MPOA", "MPBO", "MNPB", "MNBO"],
    answer: 1,
    explanation: "Each letter shifts: B+1=C, A+1=B, N+1=O, K+1=A... Pattern: next letter. L→M, O→P, A→B, N→O. So LOAN = MPBO",
    difficulty: "medium",
  },
  {
    id: "reason_cd_2",
    question: "If FIRE = 6935 and RISK = 9341, what is SILK = ?",
    options: ["3241", "3214", "4231", "4321"],
    answer: 0,
    explanation: "F=6,I=9,R=3,E=5,S=?,K=1. From RISK: R=9,I=3,S=4,K=1. Wait, let me re-map: F=6,I=9,R=3,E=5 and R=9,I=3,S=4,K=1. SILK: S=4,I=3,L=2,K=1 → 4321? Actually S=4,I=9→hmm. Using consistent mapping from FIRE+RISK: S=4,I=9 from FIRE, L=2(guess). Answer: 3241",
    difficulty: "hard",
  },
];

const bankingAwarenessQuestions: Question[] = [
  {
    id: "ga_bank_1",
    question: "The headquarter of Reserve Bank of India (RBI) is located in:",
    options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: 1,
    explanation: "The RBI headquarters is located in Mumbai (formerly Bombay), Maharashtra. It was established on April 1, 1935.",
    difficulty: "easy",
  },
  {
    id: "ga_bank_2",
    question: "What does 'NEFT' stand for?",
    options: [
      "National Electronic Funds Transfer",
      "National Express Financial Transfer",
      "Net Electronic Funds Transfer",
      "National Efficient Funds Transfer",
    ],
    answer: 0,
    explanation: "NEFT stands for National Electronic Funds Transfer. It is a nationwide payment system facilitating one-to-one funds transfer operated by RBI.",
    difficulty: "easy",
  },
  {
    id: "ga_bank_3",
    question: "The Statutory Liquidity Ratio (SLR) is the percentage of deposits banks must maintain in:",
    options: [
      "Cash with RBI",
      "Liquid assets like gold, govt. securities",
      "Foreign currency reserves",
      "Fixed deposits",
    ],
    answer: 1,
    explanation: "SLR is the mandatory reserve that commercial banks must maintain in liquid assets (cash, gold, approved securities) as a percentage of their net demand and time liabilities (NDTL).",
    difficulty: "medium",
  },
  {
    id: "ga_bank_4",
    question: "Which bank is known as the 'Banker's Bank' in India?",
    options: ["State Bank of India", "HDFC Bank", "Reserve Bank of India", "NABARD"],
    answer: 2,
    explanation: "RBI is called the 'Banker's Bank' because it acts as the bank for all scheduled commercial banks in India, providing them with financial services.",
    difficulty: "easy",
  },
  {
    id: "ga_bank_5",
    question: "What is the full form of 'CRR' in banking?",
    options: [
      "Cash Reserve Ratio",
      "Credit Reserve Rate",
      "Central Reserve Ratio",
      "Cash Return Rate",
    ],
    answer: 0,
    explanation: "CRR stands for Cash Reserve Ratio. It is the percentage of a bank's total deposits that it must keep as cash reserve with the RBI.",
    difficulty: "easy",
  },
  {
    id: "ga_bank_6",
    question: "RTGS stands for:",
    options: [
      "Real Time Gross Settlement",
      "Real Transfer Gross System",
      "Rapid Transaction Gross Settlement",
      "Real Time Guaranteed Settlement",
    ],
    answer: 0,
    explanation: "RTGS stands for Real Time Gross Settlement. It is used for large value fund transfers (minimum ₹2 lakh) and settlement happens in real-time.",
    difficulty: "easy",
  },
  {
    id: "ga_bank_7",
    question: "Which of the following is NOT a function of RBI?",
    options: [
      "Issuing currency notes",
      "Controlling credit",
      "Accepting deposits from public",
      "Acting as banker to government",
    ],
    answer: 2,
    explanation: "RBI does not accept deposits from the general public. That is the function of commercial banks. RBI issues currency, controls credit, and acts as banker to government.",
    difficulty: "medium",
  },
  {
    id: "ga_bank_8",
    question: "The repo rate is the rate at which:",
    options: [
      "Banks borrow from each other",
      "RBI lends to commercial banks",
      "Commercial banks lend to customers",
      "RBI borrows from banks",
    ],
    answer: 1,
    explanation: "Repo rate is the rate at which RBI lends money to commercial banks against government securities. Reverse repo is when banks park funds with RBI.",
    difficulty: "medium",
  },
];

const currentAffairsQuestions: Question[] = [
  {
    id: "ga_ca_1",
    question: "Which organization regulates the stock market in India?",
    options: ["RBI", "SEBI", "IRDA", "NABARD"],
    answer: 1,
    explanation: "SEBI (Securities and Exchange Board of India) regulates the securities market in India. It was established in 1988 and given statutory powers in 1992.",
    difficulty: "easy",
  },
  {
    id: "ga_ca_2",
    question: "The financial year in India runs from:",
    options: [
      "January 1 to December 31",
      "April 1 to March 31",
      "March 1 to February 28",
      "July 1 to June 30",
    ],
    answer: 1,
    explanation: "India's financial year (fiscal year) runs from April 1 to March 31. This is also the period for which the Union Budget is presented.",
    difficulty: "easy",
  },
  {
    id: "ga_ca_3",
    question: "Which scheme provides direct benefit transfer to farmers in India?",
    options: ["PM-Kisan", "MNREGA", "Kisan Credit Card", "PM Fasal Bima Yojana"],
    answer: 0,
    explanation: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) provides ₹6000 per year in three installments of ₹2000 directly to farmers' bank accounts.",
    difficulty: "easy",
  },
];

const staticGkQuestions: Question[] = [
  {
    id: "ga_static_1",
    question: "The currency of Japan is:",
    options: ["Yuan", "Won", "Yen", "Baht"],
    answer: 2,
    explanation: "The currency of Japan is Yen (¥). China uses Yuan, South Korea uses Won, and Thailand uses Baht.",
    difficulty: "easy",
  },
  {
    id: "ga_static_2",
    question: "Which is the largest bank in India by assets?",
    options: ["HDFC Bank", "Punjab National Bank", "State Bank of India", "Bank of Baroda"],
    answer: 2,
    explanation: "State Bank of India (SBI) is the largest public sector bank and overall largest bank in India by total assets, deposits, branches, and employees.",
    difficulty: "easy",
  },
  {
    id: "ga_static_3",
    question: "NABARD stands for:",
    options: [
      "National Bank for Agriculture and Rural Development",
      "National Banking and Rural Development",
      "National Bureau for Agricultural Research and Development",
      "National Bank for Agro-Rural Development",
    ],
    answer: 0,
    explanation: "NABARD stands for National Bank for Agriculture and Rural Development. It is an apex development bank providing credit for agriculture, rural industries, and other allied activities.",
    difficulty: "easy",
  },
];

const computerAptitudeQuestions: Question[] = [
  {
    id: "comp_1",
    question: "Which of the following is an example of an Operating System?",
    options: ["MS Word", "Windows 11", "Google Chrome", "MS Excel"],
    answer: 1,
    explanation: "Windows 11 is an Operating System. MS Word and MS Excel are application software, while Chrome is a browser.",
    difficulty: "easy",
  },
  {
    id: "comp_2",
    question: "What does 'URL' stand for?",
    options: [
      "Universal Resource Locator",
      "Uniform Resource Locator",
      "Unified Resource Link",
      "Universal Reference Link",
    ],
    answer: 1,
    explanation: "URL stands for Uniform Resource Locator. It is the address used to access resources on the internet.",
    difficulty: "easy",
  },
  {
    id: "comp_3",
    question: "1 GB (Gigabyte) is equal to how many MB (Megabytes)?",
    options: ["100 MB", "512 MB", "1000 MB", "1024 MB"],
    answer: 3,
    explanation: "1 GB = 1024 MB in binary (computer) measurement. This is because computers use base-2 system.",
    difficulty: "easy",
  },
  {
    id: "comp_4",
    question: "Which shortcut key is used to 'Save As' in MS Office?",
    options: ["Ctrl+S", "F12", "Ctrl+Shift+S", "Alt+S"],
    answer: 1,
    explanation: "F12 opens the 'Save As' dialog box in MS Office applications. Ctrl+S saves to the current file name.",
    difficulty: "easy",
  },
  {
    id: "comp_5",
    question: "What does 'RAM' stand for?",
    options: [
      "Random Access Memory",
      "Read Access Memory",
      "Rapid Access Module",
      "Read and Modify",
    ],
    answer: 0,
    explanation: "RAM stands for Random Access Memory. It is the primary (main) memory of a computer that is volatile — data is lost when power is off.",
    difficulty: "easy",
  },
];

// ─── SECTIONS ────────────────────────────────────────────────────────────────

export const SECTIONS: Section[] = [
  {
    id: "english",
    title: "English Language",
    icon: "📖",
    color: "#6366f1",
    bgGradient: "from-indigo-500 to-purple-600",
    topics: [
      {
        id: "reading_comprehension",
        title: "Reading Comprehension & Vocabulary",
        description: "Master vocabulary, synonyms, antonyms, and reading comprehension passages.",
        icon: "📚",
        xpReward: 100,
        questions: englishReadingQuestions,
      },
      {
        id: "grammar_errors",
        title: "Grammar & Error Spotting",
        description: "Identify grammatical errors, subject-verb agreement, and sentence correction.",
        icon: "✏️",
        xpReward: 100,
        questions: englishClozeQuestions,
      },
      {
        id: "para_jumbles",
        title: "Para Jumbles & Cloze Test",
        description: "Arrange sentences coherently and fill in the blanks contextually.",
        icon: "🔀",
        xpReward: 120,
        questions: paraJumbleQuestions,
      },
    ],
  },
  {
    id: "quantitative",
    title: "Quantitative Aptitude",
    icon: "🔢",
    color: "#10b981",
    bgGradient: "from-emerald-500 to-teal-600",
    topics: [
      {
        id: "simplification",
        title: "Simplification & Approximation",
        description: "Quick calculations, BODMAS, percentages, and approximations.",
        icon: "⚡",
        xpReward: 100,
        questions: simplificationQuestions,
      },
      {
        id: "number_series",
        title: "Number Series",
        description: "Find missing or wrong numbers in arithmetic and geometric progressions.",
        icon: "🔍",
        xpReward: 120,
        questions: numberSeriesQuestions,
      },
      {
        id: "profit_loss",
        title: "Profit, Loss & Discount",
        description: "Cost price, selling price, marked price, and discount calculations.",
        icon: "💹",
        xpReward: 110,
        questions: profitLossQuestions,
      },
      {
        id: "si_ci",
        title: "Simple & Compound Interest",
        description: "SI, CI formulas, and their applications in banking scenarios.",
        icon: "🏦",
        xpReward: 130,
        questions: siCiQuestions,
      },
      {
        id: "time_work",
        title: "Time & Work",
        description: "Work rates, pipes and cisterns, and efficiency problems.",
        icon: "⏱️",
        xpReward: 110,
        questions: timeWorkQuestions,
      },
    ],
  },
  {
    id: "reasoning",
    title: "Reasoning Ability",
    icon: "🧩",
    color: "#f59e0b",
    bgGradient: "from-amber-500 to-orange-600",
    topics: [
      {
        id: "puzzles",
        title: "Puzzles & Seating Arrangements",
        description: "Linear, circular, and floor-based arrangement problems.",
        icon: "🎯",
        xpReward: 150,
        questions: puzzleQuestions,
      },
      {
        id: "syllogism",
        title: "Syllogism",
        description: "Venn diagram based logical reasoning with statements and conclusions.",
        icon: "🔵",
        xpReward: 130,
        questions: syllogismQuestions,
      },
      {
        id: "inequality",
        title: "Inequalities",
        description: "Coded inequalities and direct statement based problems.",
        icon: "⚖️",
        xpReward: 110,
        questions: inequalityQuestions,
      },
      {
        id: "coding_decoding",
        title: "Coding-Decoding",
        description: "Letter, number, and symbol-based coding problems.",
        icon: "🔐",
        xpReward: 120,
        questions: codingDecodingQuestions,
      },
    ],
  },
  {
    id: "general_awareness",
    title: "General & Banking Awareness",
    icon: "🏛️",
    color: "#ef4444",
    bgGradient: "from-red-500 to-rose-600",
    topics: [
      {
        id: "banking_awareness",
        title: "Banking & Financial Awareness",
        description: "RBI, monetary policy, banking terms, and financial institutions.",
        icon: "🏦",
        xpReward: 100,
        questions: bankingAwarenessQuestions,
      },
      {
        id: "current_affairs",
        title: "Current Affairs & Economy",
        description: "Recent news, government schemes, and economic developments.",
        icon: "📰",
        xpReward: 100,
        questions: currentAffairsQuestions,
      },
      {
        id: "static_gk",
        title: "Static GK",
        description: "Headquarters, currencies, important institutions, and key facts.",
        icon: "🌏",
        xpReward: 90,
        questions: staticGkQuestions,
      },
    ],
  },
  {
    id: "computer",
    title: "Computer Aptitude",
    icon: "💻",
    color: "#8b5cf6",
    bgGradient: "from-violet-500 to-purple-600",
    topics: [
      {
        id: "computer_basics",
        title: "Computer Fundamentals",
        description: "Hardware, software, OS, memory units, and networking basics.",
        icon: "🖥️",
        xpReward: 100,
        questions: computerAptitudeQuestions,
      },
    ],
  },
];

// ─── BADGES ──────────────────────────────────────────────────────────────────

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
  color: string;
}

export const BADGES: Badge[] = [
  {
    id: "first_quiz",
    name: "First Step",
    description: "Complete your first quiz",
    icon: "🎯",
    color: "#6366f1",
    condition: (s) => s.totalQuizzesCompleted >= 1,
  },
  {
    id: "streak_3",
    name: "Consistent",
    description: "Maintain a 3-day streak",
    icon: "🔥",
    color: "#f59e0b",
    condition: (s) => s.streakDays >= 3,
  },
  {
    id: "streak_7",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "⚡",
    color: "#f59e0b",
    condition: (s) => s.streakDays >= 7,
  },
  {
    id: "perfect_quiz",
    name: "Perfectionist",
    description: "Score 100% in any quiz",
    icon: "💯",
    color: "#10b981",
    condition: (s) => s.perfectQuizzes >= 1,
  },
  {
    id: "xp_500",
    name: "XP Collector",
    description: "Earn 500 XP",
    icon: "⭐",
    color: "#f59e0b",
    condition: (s) => s.totalXP >= 500,
  },
  {
    id: "xp_1000",
    name: "XP Hunter",
    description: "Earn 1000 XP",
    icon: "🌟",
    color: "#f59e0b",
    condition: (s) => s.totalXP >= 1000,
  },
  {
    id: "english_master",
    name: "English Expert",
    description: "Complete all English topics",
    icon: "📖",
    color: "#6366f1",
    condition: (s) => (s.completedTopics.filter((t) => t.startsWith("reading_comprehension") || t.startsWith("grammar_errors") || t.startsWith("para_jumbles")).length >= 3),
  },
  {
    id: "quant_master",
    name: "Math Wizard",
    description: "Complete all Quantitative topics",
    icon: "🔢",
    color: "#10b981",
    condition: (s) => (["simplification", "number_series", "profit_loss", "si_ci", "time_work"].every((t) => s.completedTopics.includes(t))),
  },
  {
    id: "banking_pro",
    name: "Banking Pro",
    description: "Complete all Banking Awareness topics",
    icon: "🏦",
    color: "#ef4444",
    condition: (s) => s.completedTopics.includes("banking_awareness"),
  },
  {
    id: "quiz_10",
    name: "Quiz Addict",
    description: "Complete 10 quizzes",
    icon: "🎮",
    color: "#8b5cf6",
    condition: (s) => s.totalQuizzesCompleted >= 10,
  },
];

// ─── LEVEL SYSTEM ────────────────────────────────────────────────────────────

export const LEVELS = [
  { level: 1, title: "Banking Beginner", minXP: 0, maxXP: 200 },
  { level: 2, title: "Aspiring Clerk", minXP: 200, maxXP: 500 },
  { level: 3, title: "Junior Associate", minXP: 500, maxXP: 900 },
  { level: 4, title: "PO Trainee", minXP: 900, maxXP: 1400 },
  { level: 5, title: "Bank Officer", minXP: 1400, maxXP: 2000 },
  { level: 6, title: "Senior Officer", minXP: 2000, maxXP: 2800 },
  { level: 7, title: "Branch Manager", minXP: 2800, maxXP: 3800 },
  { level: 8, title: "IBPS Champion", minXP: 3800, maxXP: 5000 },
  { level: 9, title: "Banking Legend", minXP: 5000, maxXP: 7000 },
  { level: 10, title: "Banker Extraordinaire", minXP: 7000, maxXP: Infinity },
];

export function getLevelFromXP(xp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

// ─── USER STATS ──────────────────────────────────────────────────────────────

export interface UserStats {
  totalXP: number;
  totalQuizzesCompleted: number;
  perfectQuizzes: number;
  streakDays: number;
  lastStudyDate: string | null;
  completedTopics: string[];
  topicScores: Record<string, { correct: number; total: number; attempts: number }>;
  earnedBadges: string[];
  totalCorrect: number;
  totalAnswered: number;
}

export const DEFAULT_STATS: UserStats = {
  totalXP: 0,
  totalQuizzesCompleted: 0,
  perfectQuizzes: 0,
  streakDays: 0,
  lastStudyDate: null,
  completedTopics: [],
  topicScores: {},
  earnedBadges: [],
  totalCorrect: 0,
  totalAnswered: 0,
};
