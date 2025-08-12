import React, { useState } from 'react';
import { Play, Lock, CheckCircle, Star, Clock, Users } from 'lucide-react';
import { LessonViewer } from './LessonViewer';

interface Lesson {
  id: number;
  title: string;
  titleChinese: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  students: number;
  rating: number;
  completed: boolean;
  locked: boolean;
  description: string;
  topics: string[];
}

export function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  React.useEffect(() => {
    const loadLessons = async () => {
      try {
        const response = await fetch('/lessons/lessons.json');
        const lessonsData = await response.json();
        setLessons(lessonsData);
      } catch (error) {
        console.error('Failed to load lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  const filteredLessons = selectedLevel === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.level === selectedLevel);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStartLesson = (lessonId: number) => {
    setCurrentLessonId(lessonId);
  };

  const handleLessonComplete = (lessonId: number) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    // Update the lesson as completed in the lessons array
    setLessons(prev => prev.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    ));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {currentLessonId && (
        <LessonViewer
          lessonId={currentLessonId}
          onClose={() => setCurrentLessonId(null)}
          onComplete={handleLessonComplete}
        />
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Learn Chinese Step by Step
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master Mandarin through our structured curriculum designed for effective learning
        </p>
      </div>

      {/* Level Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {[
          { key: 'all', label: 'All Levels' },
          { key: 'beginner', label: 'Beginner 初级' },
          { key: 'intermediate', label: 'Intermediate 中级' },
          { key: 'advanced', label: 'Advanced 高级' }
        ].map((level) => (
          <button
            key={level.key}
            onClick={() => setSelectedLevel(level.key)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedLevel === level.key
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
              lesson.locked ? 'opacity-75' : 'hover:transform hover:scale-105'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(lesson.level)}`}>
                  {lesson.level}
                </span>
                {lesson.locked ? (
                  <Lock className="w-5 h-5 text-gray-400" />
                ) : lesson.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Play className="w-5 h-5 text-red-600" />
                )}
              </div>

              <h3 className="font-bold text-xl text-gray-900 mb-2">
                {lesson.title}
              </h3>
              <h4 className="text-lg text-red-600 font-medium mb-3">
                {lesson.titleChinese}
              </h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {lesson.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {lesson.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {lesson.duration}
                </div>

              <button
                disabled={lesson.locked}
                onClick={() => !lesson.locked && handleStartLesson(lesson.id)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  lesson.locked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : lesson.completed
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                    : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg'
                }`}
              >
                {lesson.locked 
                  ? 'Complete Previous Lessons' 
                  : lesson.completed 
                  ? 'Review Lesson' 
                  : 'Start Lesson'
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
