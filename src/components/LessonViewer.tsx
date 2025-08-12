import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Volume2, CheckCircle, X, Play, BookOpen } from 'lucide-react';

interface LessonContent {
  introduction: string;
  vocabulary: Array<{
    character: string;
    pinyin: string;
    english: string;
    audio: string;
    example: string;
  }>;
  exercises: Array<{
    type: string;
    question: string;
    options: string[];
    correct: number;
  }>;
}

interface Lesson {
  id: number;
  title: string;
  titleChinese: string;
  level: string;
  duration: string;
  description: string;
  content: LessonContent;
}

interface LessonViewerProps {
  lessonId: number;
  onClose: () => void;
  onComplete: (lessonId: number) => void;
}

export function LessonViewer({ lessonId, onClose, onComplete }: LessonViewerProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExerciseResult, setShowExerciseResult] = useState(false);
  const [exerciseScore, setExerciseScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Steps: 0 = Introduction, 1 = Vocabulary, 2 = Exercises, 3 = Completion
  const steps = ['Introduction', 'Vocabulary', 'Exercises', 'Completion'];

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const response = await fetch('/lessons/lessons.json');
        const lessons = await response.json();
        const foundLesson = lessons.find((l: Lesson) => l.id === lessonId);
        setLesson(foundLesson);
      } catch (error) {
        console.error('Failed to load lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      if (currentVocabIndex < lesson!.content.vocabulary.length - 1) {
        setCurrentVocabIndex(prev => prev + 1);
      } else {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (!showExerciseResult) {
        handleExerciseSubmit();
      } else {
        if (currentExerciseIndex < lesson!.content.exercises.length - 1) {
          setCurrentExerciseIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowExerciseResult(false);
        } else {
          setCurrentStep(3);
        }
      }
    } else if (currentStep === 3) {
      onComplete(lessonId);
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep === 1 && currentVocabIndex > 0) {
      setCurrentVocabIndex(prev => prev - 1);
    } else if (currentStep === 2 && currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExerciseResult(false);
    } else if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      if (currentStep === 2) {
        setCurrentVocabIndex(lesson!.content.vocabulary.length - 1);
      }
    }
  };

  const handleExerciseSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowExerciseResult(true);
    if (selectedAnswer === lesson!.content.exercises[currentExerciseIndex].correct) {
      setExerciseScore(prev => prev + 1);
    }
  };

  const playAudio = (audioPath: string) => {
    // Audio playback would be implemented here
    console.log('Playing audio:', audioPath);
    const audio = new Audio(audioPath);
    audio.play();
  };

  const playCharacter = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    // Pick a Chinese voice if available
    const chineseVoice = voices.find(v =>
      v.lang.startsWith('zh') || v.lang.startsWith('cmn') || v.lang.startsWith('yue')
    );
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }
    utterance.rate = 0.8; // slower for clarity
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Speech synthesis not supported in this browser.');
  }
};


  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-red-600 mb-4">Lesson not found</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const renderIntroduction = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
      <h3 className="text-xl text-red-600 font-medium mb-4">{lesson.titleChinese}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
        {lesson.content.introduction}
      </p>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <span>Duration: {lesson.duration}</span>
          <span>Level: {lesson.level}</span>
          <span>Vocabulary: {lesson.content.vocabulary.length} words</span>
        </div>
      </div>
    </div>
  );

  const renderVocabulary = () => {
    const vocab = lesson.content.vocabulary[currentVocabIndex];
    return (
      <div className="text-center">
        <div className="mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Vocabulary {currentVocabIndex + 1} of {lesson.content.vocabulary.length}
          </span>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-8 mb-6">
          <div className="text-6xl font-bold text-red-600 mb-4">{vocab.character}</div>
          <div className="text-2xl text-gray-700 mb-2">{vocab.pinyin}</div>
          <div className="text-xl text-gray-600 font-medium mb-4">{vocab.english}</div>
        
                        <button
                           onClick={() => playCharacter(vocab.character)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                      >
            <Play className="w-4 h-4 mr-2" />
        Play Pinyin
          </button>

          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-800 mb-2">{vocab.example}</p>
            <p className="text-gray-500 text-sm">Example sentence</p>
          </div>
        </div>
      </div>
    );
  };

  const renderExercises = () => {
    const exercise = lesson.content.exercises[currentExerciseIndex];
    const isCorrect = selectedAnswer === exercise.correct;

    return (
      <div>
        <div className="mb-6 text-center">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            Exercise {currentExerciseIndex + 1} of {lesson.content.exercises.length}
          </span>
        </div>

        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {exercise.question}
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showExerciseResult && setSelectedAnswer(index)}
                className={`p-4 rounded-lg text-left font-medium transition-all duration-200 border-2 ${
                  selectedAnswer === index
                    ? showExerciseResult
                      ? index === exercise.correct
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-50 text-red-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : showExerciseResult && index === exercise.correct
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-red-300 hover:bg-red-50'
                }`}
                disabled={showExerciseResult}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showExerciseResult && index === exercise.correct && (
                    <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                  {showExerciseResult && selectedAnswer === index && index !== exercise.correct && (
                    <X className="w-5 h-5 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExerciseResult && (
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '正确！Correct!' : '错误。Incorrect.'}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCompletion = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Complete!</h2>
      <p className="text-gray-600 mb-6">
        Congratulations! You've completed "{lesson.title}".
      </p>
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">{lesson.content.vocabulary.length}</div>
            <div className="text-gray-600">Words Learned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{exerciseScore}</div>
            <div className="text-gray-600">Correct Answers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((exerciseScore / lesson.content.exercises.length) * 100)}%
            </div>
            <div className="text-gray-600">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderIntroduction();
      case 1: return renderVocabulary();
      case 2: return renderExercises();
      case 3: return renderCompletion();
      default: return renderIntroduction();
    }
  };

  const canGoNext = () => {
    if (currentStep === 2 && !showExerciseResult) {
      return selectedAnswer !== null;
    }
    return true;
  };

  const getNextButtonText = () => {
    if (currentStep === 0) return 'Start Learning';
    if (currentStep === 1) {
      return currentVocabIndex < lesson.content.vocabulary.length - 1 ? 'Next Word' : 'Start Exercises';
    }
    if (currentStep === 2) {
      if (!showExerciseResult) return 'Submit Answer';
      return currentExerciseIndex < lesson.content.exercises.length - 1 ? 'Next Exercise' : 'Complete Lesson';
    }
    if (currentStep === 3) return 'Finish';
    return 'Next';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">{lesson.title}</h1>
            <div className="w-9 h-9"></div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  index <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
          <div className="text-sm opacity-90">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderCurrentStep()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0 && currentVocabIndex === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0 && currentVocabIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              canGoNext()
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {getNextButtonText()}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
