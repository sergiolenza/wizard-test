import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { t } from 'i18next';
import { MdChevronRight } from 'react-icons/md';
import Input from '../../components/Input/Input';
import TextTitle from '../../components/TextTitle/TextTitle';
import Button from '../../components/Button/Button';
import useInput from '../../hooks/useInput';
import useForm from '../../hooks/useForm';
import { submitForm } from '../../services/api';
import './PasswordManagerCreation.scss';

const PasswordManagerCreation = ({ wizardState, setWizardState }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  if (!wizardState.legalAge) {
    return <Navigate replace to="/password-manager-info" />;
  }

  const onFormValid = async ({ firstPassword, secondPassword, hint }) => {
    setLoading(true);
    try {
      await submitForm(firstPassword, secondPassword, hint);
      setWizardState({ legalAge: false, firstPassword: '', secondPassword: '', hint: '' });
      navigate('/password-manager-feedback', { state: { error: false } });
    } catch (e) {
      setWizardState({ ...wizardState, firstPassword, secondPassword, hint });
      navigate('/password-manager-feedback', { state: { error: true } });
    } finally {
      setLoading(false);
    }
  };

  const customValidations = ({ firstPassword, secondPassword }) => {
    let errors = {};
    if (firstPassword !== secondPassword) {
      errors = { secondPassword: { mismatch: true } };
    }
    return errors;
  };

  const { errors, clearFieldErrors, onSubmit } = useForm({
    onFormValid,
    customValidations,
  });

  const firstPasswordProps = useInput({
    name: 'firstPassword',
    initialValue: wizardState.firstPassword,
    beforeChange: clearFieldErrors,
  });

  const secondPasswordProps = useInput({
    name: 'secondPassword',
    initialValue: wizardState.secondPassword,
    beforeChange: clearFieldErrors,
  });

  const hintProps = useInput({
    name: 'hint',
    initialValue: wizardState.hint,
    beforeChange: clearFieldErrors,
  });

  const handleCancelOnClick = () => {
    navigate('/password-manager-info');
  };

  const passwordPattern = '^(?=.{8,24}$)(?=.*?[0-9])(?=.*?[A-Z]).*$';

  const firstPasswordErrorMessage =
    (!!errors.firstPassword &&
      !!errors.firstPassword.patternMismatch &&
      t('pwCreation.errors.patternMismatch')) ||
    (!!errors.firstPassword &&
      !!errors.firstPassword.valueMissing &&
      t('pwCreation.errors.valueMissing'));

  const secondPasswordErrorMessage =
    (!!errors.secondPassword &&
      !!errors.secondPassword.patternMismatch &&
      t('pwCreation.errors.patternMismatch')) ||
    (!!errors.secondPassword &&
      !!errors.secondPassword.valueMissing &&
      t('pwCreation.errors.valueMissing')) ||
    (!!errors.secondPassword &&
      !!errors.secondPassword.mismatch &&
      t('pwCreation.errors.mismatch'));

  return (
    <form
      className="password-manager-creation"
      aria-label="password-manager-creation"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <fieldset className="wizard--fieldset" aria-label="wizard-fieldset" disabled={loading}>
        <article className="wizard--content" aria-label="wizard-content">
          <TextTitle>{t('pwCreation.createYourPassword')}</TextTitle>
          <p>
            <span>{t('pwCreation.shouldCreatePassword')}</span>
            <span>{t('pwCreation.shouldCreatePassword')}</span>
          </p>
          <div className="password-manager-creation--passwords">
            <Input
              type="password"
              label={t('pwCreation.createYourMasterPassword')}
              placeholder={t('pwCreation.writeYourMasterPassword')}
              showStrength
              required
              error={firstPasswordErrorMessage}
              pattern={passwordPattern}
              {...firstPasswordProps}
            />
            <Input
              type="password"
              label={t('pwCreation.repeatYourMasterPassword')}
              placeholder={t('pwCreation.repeatYourPassword')}
              required
              error={secondPasswordErrorMessage}
              pattern={passwordPattern}
              {...secondPasswordProps}
            />
          </div>
          <p>{t('pwCreation.alsoCanCreateHint')}</p>
          <Input
            type="text"
            label={t('pwCreation.createHint')}
            placeholder={t('pwCreation.writeYourHint')}
            fullWidth
            maxLength={255}
            showCharCounter
            {...hintProps}
          />
        </article>
      </fieldset>
      <footer className="wizard--footer" aria-label="wizard-footer">
        <Button variant="text" disabled={loading} onClick={handleCancelOnClick}>
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          id="password-manager-creation-next-button"
        >
          {loading ? t('pwCreation.creating') : t('pwCreation.create')}{' '}
          <MdChevronRight size="1.5em" />
        </Button>
      </footer>
    </form>
  );
};

export default PasswordManagerCreation;
