import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdOutlineWarningAmber } from 'react-icons/md';
import './PasswordManagerFeedback.scss';

const PasswordManagerFeedback = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate replace to="/password-manager-info" />;
  }

  const { error } = state;

  const ErrorFeedback = (
    <article className="wizard--content">
      <div className="password-manager-feedback">
        <div className="password-manager-feedback--icon">
          <MdOutlineWarningAmber size="3em" />
        </div>
        <div className="password-manager-feedback--text">
          <h2>Ha habido un error</h2>
          <p>No hemos podido modificar tu Contraseña Maestra. Inténtalo más tarde.</p>
        </div>
      </div>
    </article>
  );

  const SuccessFeedback = (
    <article className="wizard--content">
      <div className="password-manager-feedback">
        <div className="password-manager-feedback--icon">
          <BsCheck2Circle size="3em" />
        </div>
        <div className="password-manager-feedback--text">
          <h2>¡Tu password manager ya está creado!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh.
          </p>
        </div>
      </div>
    </article>
  );

  return error ? ErrorFeedback : SuccessFeedback;
};

export default PasswordManagerFeedback;
