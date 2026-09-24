import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ta from '../locales/ta.json';
import hi from '../locales/hi.json';
import te from '../locales/te.json';
import kn from '../locales/kn.json';
import ml from '../locales/ml.json';

const translations = { en, ta, hi, te, kn, ml };

export const languageNames = {
  en: 'English',
  ta: 'தமிழ் (Tamil)',
  hi: 'हिन्दी (Hindi)',
  te: 'తెలుగు (Telugu)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ml: 'മലയാളം (Malayalam)'
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Independent victim and officer languages
  const [victimLang, setVictimLangState] = useState(() => {
    return localStorage.getItem('nhaa_victim_lang') || 'en';
  });

  const [officerLang, setOfficerLangState] = useState(() => {
    return localStorage.getItem('nhaa_officer_lang') || 'en';
  });

  // Active view: 'public' or 'officer'
  const [activePortal, setActivePortal] = useState('public');

  const setVictimLang = (lang) => {
    setVictimLangState(lang);
    localStorage.setItem('nhaa_victim_lang', lang);
  };

  const setOfficerLang = (lang) => {
    setOfficerLangState(lang);
    localStorage.setItem('nhaa_officer_lang', lang);
  };

  // Translation helper: t('nav.home', 'ta') or defaults to portal's active language
  const t = (path, explicitLang = null) => {
    const lang = explicitLang || (activePortal === 'officer' ? officerLang : victimLang);
    const activeDict = translations[lang] || translations.en;

    const keys = path.split('.');
    let current = activeDict;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if key missing in translation
        let fallback = translations.en;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider
      value={{
        victimLang,
        setVictimLang,
        officerLang,
        setOfficerLang,
        activePortal,
        setActivePortal,
        t,
        languageNames,
        languages: Object.keys(languageNames)
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
