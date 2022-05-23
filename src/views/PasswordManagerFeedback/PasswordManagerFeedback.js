import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { t } from 'i18next';
import { MdOutlineWarningAmber, MdOutlineCheckCircle } from 'react-icons/md';
import Placeholder from '../../components/Placeholder/Placeholder';

const PasswordManagerFeedback = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate replace to="/password-manager-info" />;
  }

  const { error } = state;

  return (
    <>
      <article className="wizard--content" aria-label="password-manager-feedback">
        {error ? (
          <Placeholder
            error
            icon={<MdOutlineWarningAmber size="3em" id="warning" />}
            primaryText={t('pwFeedback.thereIsAnError')}
            secondaryText={t('pwFeedback.weCannotUpdate')}
          />
        ) : (
          <Placeholder
            icon={<MdOutlineCheckCircle size="3em" id="check" />}
            primaryText={t('pwFeedback.passwordManagerCreated')}
            secondaryText={t('pwFeedback.loremIpsum')}
          />
        )}
      </article>
      <footer className="wizard--footer end" aria-label="wizard-footer">
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
