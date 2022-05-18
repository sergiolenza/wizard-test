import React from 'react';
import { t } from 'i18next';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';
import './NoMatch.scss';

const NoMatch = () => {
  return (
    <article className="no-match" aria-label="no-match">
      <MdSentimentVeryDissatisfied size="5em" />
      <h1 className="no-match--text" aria-label="no-match-text">
        {t('common.noMatch')}
      </h1>
    </article>
  );
};

export default NoMatch;
