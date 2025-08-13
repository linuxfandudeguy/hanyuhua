import React, { useState } from 'react';
import { Check, X, RefreshCw, Star, Target, Zap } from 'lucide-react';

interface Question {
  id: number;
  type: 'translation' | 'pinyin' | 'character' | 'audio';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  character: string;
}

const practiceQuestions: Question[] = [
  {
    id: 1,
    type: 'translation',
    question: 'How do you say "Hello" in Chinese?',
    options: ['再见', '你好', '谢谢', '对不起'],
    correct: 1,
    explanation: '你好 (nǐ hǎo) is the standard greeting in Chinese.',
    character: '?'
  },
  {
    id: 2,
    type: 'pinyin',
    question: 'What is the correct pinyin for 学习?',
    options: ['xuéxí', 'xiéxí', 'xüéxí', 'xúexí'],
    correct: 0,
    explanation: '学习 is pronounced "xuéxí" - note the tone marks on both syllables.',
    character: '学习'
  },
  {
    id: 3,
    type: 'character',
    question: 'Which character means "friend"?',
    options: ['朋友', '老师', '学生', '家人'],
    correct: 0,
    explanation: '朋友 (péng yǒu) means friend. 老师 = teacher, 学生 = student, 家人 = family.',
    character: '?'
  },
  {
    id: 4,
    type: 'translation',
    question: 'What does 家庭 mean in English?',
    options: ['House', 'Family', 'Home', 'Garden'],
    correct: 1,
    explanation: '家庭 (jiā tíng) means family. 家 alone can mean house or home.',
    character: '家庭'
  },
  {
    id: 5,
    type: 'pinyin',
    question: 'What is the correct pinyin for 中国?',
    options: ['zhōngguó', 'chōngguó', 'zhèngguó', 'zōngguó'],
    correct: 0,
    explanation: '中国 (zhōngguó) means China. The first tone on 中 and second tone on 国.',
    character: '中国'
  }
];

export function Practice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const question = practiceQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    setAnsweredQuestions(prev => new Set([...prev, question.id]));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(prev => (prev + 1) % practiceQuestions.length);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Set());
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'translation': return <Target className="w-5 h-5" />;
      case 'pinyin': return <Zap className="w-5 h-5" />;
      case 'character': return <span className="text-lg font-bold">汉</span>;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'translation': return 'bg-blue-100 text-blue-700';
      case 'pinyin': return 'bg-purple-100 text-purple-700';
      case 'character': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Practice & Quiz
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Test your Chinese knowledge with interactive quizzes and exercises
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
            <Star className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{score}</div>
          <div className="text-gray-600">Correct Answers</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {currentQuestion + 1} / {practiceQuestions.length}
          </div>
          <div className="text-gray-600">Questions</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%
          </div>
          <div className="text-gray-600">Accuracy</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getQuestionTypeColor(question.type)}`}>
            {getQuestionTypeIcon(question.type)}
            <span className="capitalize">{question.type}</span>
          </div>
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1}
          </div>
        </div>

        {question.character && (
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {question.character}
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          {question.question}
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`p-4 rounded-lg text-left font-medium transition-all duration-200 border-2 ${
                selectedAnswer === index
                  ? showResult
                    ? index === question.correct
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : showResult && index === question.correct
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-red-300 hover:bg-red-50'
              }`}
              disabled={showResult}
            >
              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
                {showResult && index === question.correct && (
                  <Check className="w-5 h-5 text-green-600 ml-auto" />
                )}
                {showResult && selectedAnswer === index && index !== question.correct && (
                  <X className="w-5 h-5 text-red-600 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`font-medium mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '正确！Correct!' : '错误。Incorrect.'}
            </div>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-center">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next Question
              </button>
              <button
                onClick={resetQuiz}
                className="flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Reset Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Quiz Progress</span>
          <span>{answeredQuestions.size} of {practiceQuestions.length} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredQuestions.size / practiceQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
