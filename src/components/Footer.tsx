import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">汉</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                  汉语花
                </h3>
                <p className="text-xs text-gray-400">HanyuHua</p>
              </div>
            </div>

            <p className="text-gray-400 mb-4 leading-relaxed">
              With us, you might learn Chinese. Or you might just click around. Either way, enjoy!
            </p>

            <div className="flex space-x-4">
              <a href="https://github.com/linuxfandudeguy/learn-chinese" className="text-gray-400 hover:text-red-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:koshlandjg105@gmail.com" className="text-gray-400 hover:text-red-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

         
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://github.com/linuxfandudeguy/learn-chinese/issues/new" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> (and Vite-bundled Typescript React.js) for Chinese learners worldwide</p>
          <p className="text-gray-500 text-sm mt-2">
            © {currentYear} 汉语花. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
