import React from 'react';
import { TrendingUp, Award, Flame, Calendar, BookOpen, Target, Star, Trophy } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  maxProgress: number;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: <BookOpen className="w-6 h-6" />,
    earned: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: 2,
    title: 'Week Warrior',
    description: 'Study for 7 days in a row',
    icon: <Flame className="w-6 h-6" />,
    earned: false,
    progress: 4,
    maxProgress: 7
  },
  {
    id: 3,
    title: 'Character Master',
    description: 'Learn 100 characters',
    icon: <span className="text-lg font-bold">汉</span>,
    earned: false,
    progress: 67,
    maxProgress: 100
  },
  {
    id: 4,
    title: 'Perfect Score',
    description: 'Get 100% on a practice quiz',
    icon: <Star className="w-6 h-6" />,
    earned: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: 5,
    title: 'Vocabulary Builder',
    description: 'Master 50 vocabulary words',
    icon: <Target className="w-6 h-6" />,
    earned: false,
    progress: 32,
    maxProgress: 50
  },
  {
    id: 6,
    title: 'Monthly Dedication',
    description: 'Study for 30 days',
    icon: <Calendar className="w-6 h-6" />,
    earned: false,
    progress: 18,
    maxProgress: 30
  }
];

export function Progress() {
  const totalXP = 1250;
  const currentLevel = 5;
  const xpToNextLevel = 300;
  const studyStreak = 4;
  const totalStudyTime = 28; // hours

  const weeklyActivity = [
    { day: 'Mon', minutes: 25, completed: true },
    { day: 'Tue', minutes: 30, completed: true },
    { day: 'Wed', minutes: 0, completed: false },
    { day: 'Thu', minutes: 45, completed: true },
    { day: 'Fri', minutes: 20, completed: true },
    { day: 'Sat', minutes: 0, completed: false },
    { day: 'Sun', minutes: 35, completed: true },
  ];

  const skillProgress = [
    { skill: 'Reading', progress: 75, color: 'bg-blue-500' },
    { skill: 'Writing', progress: 60, color: 'bg-green-500' },
    { skill: 'Listening', progress: 45, color: 'bg-purple-500' },
    { skill: 'Speaking', progress: 30, color: 'bg-red-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Learning Progress
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your Chinese learning journey and celebrate your achievements
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-3">
            <Trophy className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">Level {currentLevel}</div>
          <div className="text-sm text-gray-600">{totalXP} XP Total</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${(xpToNextLevel / 500) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{xpToNextLevel} XP to next level</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
            <Flame className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{studyStreak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalStudyTime}h</div>
          <div className="text-sm text-gray-600">Total Study Time</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {achievements.filter(a => a.earned).length}
          </div>
          <div className="text-sm text-gray-600">Achievements</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Weekly Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
              Weekly Activity
            </h2>
            <div className="flex justify-between items-end h-32">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 rounded-t transition-all duration-300 ${
                      day.completed ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                    style={{ height: `${(day.minutes / 45) * 100}px` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-500">{day.day}</div>
                  <div className="text-xs font-medium text-gray-700">{day.minutes}m</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Skill Development
            </h2>
            <div className="space-y-4">
              {skillProgress.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">{skill.skill}</span>
                    <span className="text-sm text-gray-500">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${skill.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2 text-red-600" />
            Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  achievement.earned
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                    achievement.earned ? 'bg-yellow-200 text-yellow-700' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                </div>
                
                {!achievement.earned && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {achievement.progress} / {achievement.maxProgress}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}