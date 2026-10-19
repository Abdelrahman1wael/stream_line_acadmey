import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations.js';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_lang');
      if (saved === 'en' || saved === 'ar') return saved;
    }
    return 'ar';
  });

  const isRTL = lang === 'ar';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_lang', lang);
    }
  }, [lang, isRTL]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key, fallback = '') => {
    if (translations[lang] && translations[lang][key] !== undefined) {
      return translations[lang][key];
    }
    if (translations.ar && translations.ar[key] !== undefined) {
      return translations.ar[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
