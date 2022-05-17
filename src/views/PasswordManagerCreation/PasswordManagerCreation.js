import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { MdChevronRight } from 'react-icons/md';
import Input from '../../components/Input/Input';
import TextTitle from '../../components/TextTitle/TextTitle';
import Button from '../../components/Button/Button';
import useInput from '../../hooks/useInput';
import useForm from '../../hooks/useForm';
import './PasswordManagerCreation.scss';
import { submitForm } from '../../services/api';

const PasswordManagerCreation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const onFormValid = async ({ firstPassword, secondPassword, hint }) => {
    setLoading(true);
    console.log('form is valid!', { firstPassword, secondPassword, hint });

    try {
      await submitForm();
      navigate('/password-manager-feedback', { state: { error: false } });
    } catch (e) {
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
    initialValue: '',
    beforeChange: clearFieldErrors,
  });

  const secondPasswordProps = useInput({
    name: 'secondPassword',
    initialValue: '',
    beforeChange: clearFieldErrors,
  });

  const hintProps = useInput({
    name: 'hint',
    initialValue: '',
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
    <form className="password-manager-creation" noValidate autoComplete="off" onSubmit={onSubmit}>
      <fieldset className="wizard--fieldset" disabled={loading}>
        <article className="wizard--content">
          <TextTitle>{t('pwCreation.createYourPassword')}</TextTitle>
          <p>{t('pwCreation.shouldCreatePassword')}</p>
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
          <p>{t('pwCreation.alsoCanCreateHint')}.</p>
          <Input
            type="text"
            label={t('pwCreation.createHint')}
            placeholder={t('pwCreation.writeYourHint')}
            fullWidth
            maxLength={255}
            {...hintProps}
          />
        </article>
      </fieldset>
      <footer className="wizard--footer">
        <Button variant="text" disabled={loading} onClick={handleCancelOnClick}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" disabled={loading} variant="contained">
          {loading ? t('pwCreation.creating') : t('pwCreation.create')}{' '}
          <MdChevronRight size="1.5em" />
        </Button>
      </footer>
    </form>
  );
};

export default PasswordManagerCreation;
