import React, { useState } from 'react';
import {  RotateCcw, CheckCircle, X } from 'lucide-react';

interface VocabularyCard {
  id: number;
  character: string;
  pinyin: string;
  english: string;
  category: string;
  difficulty: number;
  strokeOrder: string[];
  example: {
    chinese: string;
    pinyin: string;
    english: string;
  };
}

const vocabularyCards: VocabularyCard[] = [
  {
    id: 1,
    character: '你好',
    pinyin: 'nǐ hǎo',
    english: 'hello',
    category: 'greetings',
    difficulty: 1,
    strokeOrder: ['丿', '亻', '尔', '女', '子'],
    example: {
      chinese: '你好，很高兴见到你！',
      pinyin: 'nǐ hǎo, hěn gāoxìng jiàn dào nǐ!',
      english: 'Hello, nice to meet you!'
    }
  },
  {
    id: 2,
    character: '学习',
    pinyin: 'xué xí',
    english: 'to study, learn',
    category: 'education',
    difficulty: 2,
    strokeOrder: ['学', '习'],
    example: {
      chinese: '我正在学习中文。',
      pinyin: 'wǒ zhèngzài xuéxí zhōngwén.',
      english: 'I am studying Chinese.'
    }
  },
  {
    id: 3,
    character: '朋友',
    pinyin: 'péng yǒu',
    english: 'friend',
    category: 'relationships',
    difficulty: 2,
    strokeOrder: ['朋', '友'],
    example: {
      chinese: '他是我最好的朋友。',
      pinyin: 'tā shì wǒ zuì hǎo de péng yǒu.',
      english: 'He is my best friend.'
    }
  },
  {
    id: 4,
    character: '家庭',
    pinyin: 'jiā tíng',
    english: 'family',
    category: 'family',
    difficulty: 3,
    strokeOrder: ['家', '庭'],
    example: {
      chinese: '我的家庭很幸福。',
      pinyin: 'wǒ de jiā tíng hěn xìngfú.',
      english: 'My family is very happy.'
    }
  },
  {
    id: 5,
    character: '工作',
    pinyin: 'gōng zuò',
    english: 'work, job',
    category: 'career',
    difficulty: 2,
    strokeOrder: ['工', '作'],
    example: {
      chinese: '他在北京工作。',
      pinyin: 'tā zài běijīng gōng zuò.',
      english: 'He works in Beijing.'
    }
  },
  {
    id: 6,
    character: '美丽',
    pinyin: 'měi lì',
    english: 'beautiful',
    category: 'adjectives',
    difficulty: 3,
    strokeOrder: ['美', '丽'],
    example: {
      chinese: '这朵花很美丽。',
      pinyin: 'zhè duǒ huā hěn měi lì.',
      english: 'This flower is very beautiful.'
    }
  }
];

export function Vocabulary() {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'greetings', 'education', 'relationships', 'family', 'career', 'adjectives'];

  const filteredCards = selectedCategory === 'all' 
    ? vocabularyCards 
    : vocabularyCards.filter(card => card.category === selectedCategory);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const markAsStudied = (cardId: number) => {
    setStudiedCards(prev => new Set([...prev, cardId]));
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-700';
      case 2: return 'bg-yellow-100 text-yellow-700';
      case 3: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const currentVocab = filteredCards[currentCard];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Vocabulary Builder
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master essential Chinese vocabulary with interactive flashcards and spaced repetition
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentCard(0);
              setShowAnswer(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{currentCard + 1} of {filteredCards.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCard + 1) / filteredCards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 min-h-[400px] flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentVocab.difficulty)}`}>
              Level {currentVocab.difficulty}
            </span>
            <div className="flex items-center space-x-2">
            
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-red-600 mb-4">
              {currentVocab.character}
            </div>
            <div className="text-2xl text-gray-700 mb-2">
              {currentVocab.pinyin}
            </div>
            {showAnswer && (
              <div className="animate-fade-in">
                <div className="text-xl text-gray-600 font-medium mb-4">
                  {currentVocab.english}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-lg text-gray-800 mb-2">{currentVocab.example.chinese}</p>
                  <p className="text-gray-600 mb-1">{currentVocab.example.pinyin}</p>
                  <p className="text-gray-600 italic">{currentVocab.example.english}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Show Translation
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    markAsStudied(currentVocab.id);
                    handleNext();
                  }}
                  className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Got it!
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors shadow-md"
                >
                  <X className="w-5 h-5 mr-2" />
                  Need practice
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="flex items-center px-6 py-3 bg-white text-gray-600 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="text-sm text-gray-500">
            Studied: {studiedCards.size} / {filteredCards.length}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Next
            <RotateCcw className="w-5 h-5 ml-2 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}