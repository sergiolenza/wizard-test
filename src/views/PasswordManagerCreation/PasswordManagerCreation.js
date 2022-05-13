import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      console.log(e);
      navigate('/password-manager-feedback', { state: { error: true } });
    } finally {
      setLoading(false);
    }
    // setMutationError(false);
    // setCloseDisabled(true);

    // client
    //   .mutate({
    //     mutation: TENANT_USER_MUTATION,
    //     variables: {
    //       fullName,
    //       email,
    //       phoneNumber:
    //         countryCallingCode && nationalNumber ? `+${countryCallingCode}${nationalNumber}` : '',
    //       ...(image.preview ? { base64Image: await toBase64(image.preview) } : {}),
    //     },
    //   })
    //   .then(() => {
    //     closeMenu();
    //     openSuccessToast();
    //   })
    //   .catch((err) => {
    //     // eslint-disable-next-line
    //     console.error(err);
    //     setMutationError(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //     setCloseDisabled(false);
    //   });
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
      'La contraseña tiene que contener de 8 a 24 caracteres, al menos 1 número y 1 mayúscula') ||
    (!!errors.firstPassword && !!errors.firstPassword.valueMissing && 'Este campo es obligatorio');

  const secondPasswordErrorMessage =
    (!!errors.secondPassword &&
      !!errors.secondPassword.patternMismatch &&
      'La contraseña tiene que contener de 8 a 24 caracteres, al menos 1 número y 1 mayúscula') ||
    (!!errors.secondPassword &&
      !!errors.secondPassword.valueMissing &&
      'Este campo es obligatorio') ||
    (!!errors.secondPassword &&
      !!errors.secondPassword.mismatch &&
      'Esta contraseña tiene ser igual que la primera');

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <fieldset className="wizard--fieldset" disabled={loading}>
        <article className="wizard--content">
          <TextTitle>Crea tu password manager</TextTitle>
          <p>
            En primer lugar debes crear una contraseña diferente para tus pertenencias electrónicas.
            No podrás recuperar tu contraseña, así que recuérdala bien.
          </p>
          <div className="creation-passwords">
            <Input
              type="password"
              label="Crea tu contraseña maestra"
              placeholder="Escribe tu contraseña"
              showStrength
              required
              error={firstPasswordErrorMessage}
              pattern={passwordPattern}
              {...firstPasswordProps}
            />
            <Input
              type="password"
              label="Repite tu contraseña maestra"
              placeholder="Repite tu contraseña"
              required
              error={secondPasswordErrorMessage}
              pattern={passwordPattern}
              {...secondPasswordProps}
            />
          </div>
          <p>También puedes crear una pista que te ayude a recordar tu contraseña maestra.</p>
          <Input
            type="text"
            label="Crea tu pista para recordar tu contraseña (opcional)"
            placeholder="Introduce tu pista"
            fullWidth
            maxLength={255}
            {...hintProps}
          />
        </article>
      </fieldset>
      <footer className="wizard--footer">
        <Button variant="text" disabled={loading} onClick={handleCancelOnClick}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} variant="contained">
          {loading ? 'Creando…' : 'Crear'}
        </Button>
      </footer>
    </form>
  );
};

export default PasswordManagerCreation;
