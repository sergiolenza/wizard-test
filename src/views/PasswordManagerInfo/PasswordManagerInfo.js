import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { MdChevronRight } from 'react-icons/md';
import TextTitle from '../../components/TextTitle/TextTitle';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import useInput from '../../hooks/useInput';
import passwordsSvg from '../../assets/img/group.svg';
import safeBoxSvg from '../../assets/img/group-3.svg';
import './PasswordManagerInfo.scss';

const PasswordManagerInfo = ({ wizardState, setWizardState }) => {
  const navigate = useNavigate();

  const onClickNext = () => {
    setWizardState({
      ...wizardState,
      legalAge: true,
    });
    navigate('/password-manager-creation');
  };

  const legalAgeProps = useInput({ name: 'legalAge', initialValue: wizardState.legalAge });

  return (
    <>
      <article className="wizard--content" aria-label="password-manager-info">
        <TextTitle>{t('pwInfo.createYourPassword')}</TextTitle>
        <div className="password-manager-info">
          <div className="password-manager-info--tip">
            <img
              className="password-manager-info--tip-image"
              src={passwordsSvg}
              alt={t('pwInfo.rememberPasswords')}
            />
            <small className="password-manager-info--tip-text">
              {t('pwInfo.saveYourPasswords')}
            </small>
          </div>
          <div className="password-manager-info--tip">
            <img
              className="password-manager-info--tip-image"
              src={safeBoxSvg}
              alt={t('pwInfo.safeBox')}
            />
            <small className="password-manager-info--tip-text">{t('pwInfo.createMasterKey')}</small>
          </div>
        </div>
        <h4>{t('pwInfo.howItWorks')}</h4>
        <p>{t('pwInfo.createDifferentPassword')}</p>
        <h4>{t('pwInfo.dataCanYouSave')}</h4>
        <p>{t('pwInfo.infoCanSave')}</p>
        <Checkbox label={t('pwInfo.legalAge')} {...legalAgeProps} />
      </article>
      <footer className="wizard--footer">
        <Button variant="text" disabled>
          {t('common.cancel')}
        </Button>
        <Button disabled={!legalAgeProps.checked} variant="contained" onClick={onClickNext}>
          {t('common.next')} <MdChevronRight size="1.5em" />
        </Button>
      </footer>
    </>
  );
};

export default PasswordManagerInfo;
