import React from 'react';
import { createRoot } from 'react-dom/client';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import App from './App';
import * as serviceWorker from './serviceWorker';
import enTranslations from './locale/en.json';
import esTranslations from './locale/es.json';
import './index.css';

i18next.use(LanguageDetector).init({
  detection: { order: ['navigator'] },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations,
    },
    es: {
      translation: esTranslations,
    },
  },
});

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
