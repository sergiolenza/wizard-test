import React, { useState, lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import WizardNav from './WizardNav';
import './Wizard.scss';

const PasswordManagerInfo = lazy(() =>
  import(
    /* webpackChunkName: "PasswordManagerInfo" */ '../../views/PasswordManagerInfo/PasswordManagerInfo'
  )
);
const PasswordManagerCreation = lazy(() =>
  import(
    /* webpackChunkName: "PasswordManagerCreation" */ '../../views/PasswordManagerCreation/PasswordManagerCreation'
  )
);
const PasswordManagerFeedback = lazy(() =>
  import(
    /* webpackChunkName: "PasswordManagerFeedback" */ '../../views/PasswordManagerFeedback/PasswordManagerFeedback'
  )
);
const NoMatch = lazy(() => import(/* webpackChunkName: "NoMatch" */ '../../views/NoMatch/NoMatch'));

const Wizard = () => {
  const [wizardState, setWizardState] = useState({
    legalAge: false,
    firstPassword: '',
    secondPassword: '',
    hint: '',
  });

  const routes = [
    {
      path: 'password-manager-info',
      element: (
        <Suspense fallback>
          <PasswordManagerInfo wizardState={wizardState} setWizardState={setWizardState} />
        </Suspense>
      ),
    },
    {
      path: 'password-manager-creation',
      element: (
        <Suspense fallback>
          <PasswordManagerCreation wizardState={wizardState} setWizardState={setWizardState} />
        </Suspense>
      ),
    },
    {
      path: 'password-manager-feedback',
      element: (
        <Suspense fallback>
          <PasswordManagerFeedback />
        </Suspense>
      ),
    },
  ];

  const Routes = useRoutes([
    ...routes,
    ...[
      {
        path: '/',
        element: <Navigate replace to="/password-manager-info" />,
      },
      {
        path: '*',
        element: (
          <Suspense fallback>
            <NoMatch />
          </Suspense>
        ),
      },
    ],
  ]);

  return (
    <section className="wizard">
      <WizardNav steps={routes} />
      {Routes}
    </section>
  );
};

export default Wizard;
