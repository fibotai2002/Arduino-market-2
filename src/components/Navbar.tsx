/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Search, 
  Cpu, 
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { useCart } from '../store/CartContext';
import { CATEGORIES } from '../constants';
import { useTheme } from '../store/ThemeContext';
import { useI18n, Language } from '../store/I18nContext';

const Navbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 border-b border-black/5 dark:border-white/10 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black dark:bg-white rounded flex items-center justify-center">
            <Cpu className="text-white dark:text-black w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight block leading-none dark:text-white">{t('app.name')}</span>
            <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest dark:text-gray-400">{t('app.country')}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {CATEGORIES.slice(1).map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="text-sm font-medium hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              {t(`nav.${cat.id}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mr-2">
            {(['uz', 'ru', 'en'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 text-xs font-bold uppercase rounded-md transition-colors ${language === lang ? 'bg-white dark:bg-gray-600 shadow-sm dark:text-white' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={onCartClick}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors relative dark:text-white"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
