import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { t } from 'i18next';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdOutlineWarningAmber } from 'react-icons/md';
import Placeholder from '../../components/Placeholder/Placeholder';

const PasswordManagerFeedback = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate replace to="/password-manager-info" />;
  }

  const { error } = state;

  return (
    <>
      <article className="wizard--content">
        {error ? (
          <Placeholder
            icon={<MdOutlineWarningAmber size="3em" />}
            primaryText={t('pwFeedback.thereIsAnError')}
            secondaryText={t('pwFeedback.weCannotUpdate')}
          />
        ) : (
          <Placeholder
            icon={<BsCheck2Circle size="3em" />}
            primaryText={t('pwFeedback.passwordManagerCreated')}
            secondaryText={t('pwFeedback.loremIpsum')}
          />
        )}
      </article>
      <footer className="wizard--footer end">
        {error ? (
          <Link to="/">{t('pwFeedback.backToPasswordManager')}</Link>
        ) : (
          <Link to="/to-be-defined">{t('pwFeedback.access')}</Link>
        )}
      </footer>
    </>
  );
};

export default PasswordManagerFeedback;
