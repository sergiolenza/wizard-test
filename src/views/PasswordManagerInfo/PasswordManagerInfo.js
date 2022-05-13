import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      <article className="wizard--content">
        <TextTitle>Crea tu password manager</TextTitle>
        <div className="info--tips">
          <div className="info--tip">
            <img
              className="info--tip-image"
              src={passwordsSvg}
              alt="Person remembering passwords"
            />
            <small className="info--tip-text">
              Guarda aquí todas tus contraseñas, datos o cualquier información. Olvida las notas de
              papel y las aplicaciones no protegidas.
            </small>
          </div>
          <div className="info--tip">
            <img className="info--tip-image" src={safeBoxSvg} alt="Safe box" />
            <small className="info--tip-text">
              Crea tu clave maestra: sólo tu podrás acceder a tus secretos con ella.
            </small>
          </div>
        </div>
        <h4>Cómo funciona</h4>
        <p>
          En primer lugar debes crear una contraseña diferente para tus pertenencias electrónicas.
          No podrás recuperar tu contraseña, así que recuérdala bien.
        </p>
        <h4>Qué datos puedes guardar</h4>
        <p>
          Por ejemplo, el número de tu tarjeta, el PIN y el PUK de tu teléfono móvil, el número de
          serie de alguno de tus dispositivos o cualquier información que necesites tener en lugar
          seguro.
        </p>
      </article>
      <footer className="wizard--footer">
        <Button variant="text" disabled>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleNextOnClick}>
          Siguiente
        </Button>
      </footer>
    </>
  );
};

export default PasswordManagerInfo;
