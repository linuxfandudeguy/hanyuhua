import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Users, BookOpen, Target } from 'lucide-react';
// imports
interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const [dailyCharacter, setDailyCharacter] = useState('未加载'); // default/fallback

  useEffect(() => {
    async function fetchDailyCharacter() {
      try {
        const res = await fetch('/.netlify/functions/han'); // get the char
        const data = await res.json();
        if (data.character) {
          setDailyCharacter(data.character);
        }
      } catch (err) {
        console.error('Failed to fetch daily character:', err);
      }
    }
    fetchDailyCharacter();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl text-red-600 font-bold">你好</div>
        <div className="absolute top-32 right-20 text-4xl text-amber-600 font-bold">学习</div>
        <div className="absolute bottom-20 left-1/4 text-5xl text-red-600 font-bold">中文</div>
        <div className="absolute bottom-40 right-10 text-3xl text-amber-600 font-bold">汉字</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Section */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
              Start your journey
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master{' '}
              <span className="block bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                Chinese
              </span>{' '}
              with Confidence
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Learn Mandarin Chinese through interactive lessons, character practice, 
              and cultural immersion. From pinyin to fluent conversation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onGetStarted}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                开始学习 Start Learning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Card Section */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-amber-100 rounded-2xl"></div>
              <div className="relative text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">A Random Han</h3>
                <div className="text-8xl font-bold text-red-600">{dailyCharacter}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/50 rounded-xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Interactive Lessons</h3>
            <p className="text-gray-600">Learn with engaging multimedia content and real-time feedback</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 rounded-xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-amber-600">汉</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Character Practice</h3>
            <p className="text-gray-600">Master character recognition with guided practice</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 rounded-xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your learning journey with detailed analytics and achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
}
