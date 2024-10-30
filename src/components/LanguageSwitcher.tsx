import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown } from 'lucide-react';

const flags = {
  de: {
    flag: "https://flagcdn.com/w40/de.png",
    name: "Deutsch"
  },
  en: {
    flag: "https://flagcdn.com/w40/gb.png",
    name: "English"
  },
  es: {
    flag: "https://flagcdn.com/w40/es.png",
    name: "Español"
  },
  pl: {
    flag: "https://flagcdn.com/w40/pl.png",
    name: "Polski"
  }
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/80 hover:bg-white px-3 py-2 rounded-lg transition-all duration-200"
      >
        <img
          src={flags[language].flag}
          alt={`${language} flag`}
          className="w-6 h-4 object-cover rounded"
        />
        <span className="hidden sm:inline text-sm font-medium text-gray-700">{flags[language].name}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
          {Object.entries(flags).map(([lang, { flag, name }]) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm ${
                language === lang 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <img
                src={flag}
                alt={`${lang} flag`}
                className="w-6 h-4 object-cover rounded"
              />
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;