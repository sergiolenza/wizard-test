import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { MdChevronRight } from 'react-icons/md';
import TextTitle from '../../components/TextTitle/TextTitle';
import Button from '../../components/Button/Button';
import passwordsSvg from '../../assets/img/group.svg';
import safeBoxSvg from '../../assets/img/group-3.svg';
import './PasswordManagerInfo.scss';

const PasswordManagerInfo = () => {
  const navigate = useNavigate();

  const handleNextOnClick = () => {
    navigate('/password-manager-creation');
  };

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
      </article>
      <footer className="wizard--footer">
        <Button variant="text" disabled>
          {t('common.cancel')}
        </Button>
        <Button variant="contained" onClick={handleNextOnClick}>
          {t('common.next')} <MdChevronRight size="1.5em" />
        </Button>
      </footer>
    </>
  );
};

export default PasswordManagerInfo;
