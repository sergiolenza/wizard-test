const PRUEBA_KO = 'pruebaKO123';

const RESPONSE_OK = { status: 200 };
const RESPONSE_KO = { status: 401 };

// eslint-disable-next-line no-unused-vars
const submitForm = (pass, repass, optionalQuestion) =>
  new Promise((resolve, reject) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(() => (pass !== PRUEBA_KO ? resolve(RESPONSE_OK) : reject(RESPONSE_KO)), 3000)
  );

// eslint-disable-next-line import/prefer-default-export
export { submitForm };
