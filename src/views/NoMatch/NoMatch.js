import React from 'react';
import { t } from 'i18next';
import { RiEmotionSadLine } from 'react-icons/ri';
import './NoMatch.scss';

const NoMatch = () => {
  return (
    <article className="no-match" aria-label="no-match">
      <RiEmotionSadLine size="3em" />
      <h1 className="no-match--text">{t('common.noMatch')}</h1>
    </article>
  );
};

export default NoMatch;
