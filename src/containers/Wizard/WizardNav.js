import React from 'react';
import { useMatch, useLocation } from 'react-router-dom';
import { MdDone } from 'react-icons/md';
import './WizardNav.scss';

const WizardStep = ({ step, stepNumber, shouldShowLine, isCompleted }) => {
  const isActive = useMatch(step.path);
  const isDisabled = !isActive && !isCompleted;

  const stepCircleClasses = [
    'wizard--nav--step-circle',
    isActive && 'active',
    isCompleted && 'completed',
    isDisabled && 'disabled',
  ]
    .filter(Boolean)
    .join(' ');

  const stepLineClasses = [
    'wizard--nav--step-line',
    (isActive || isDisabled) && 'disabled',
    isCompleted && 'completed',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <figure className={stepCircleClasses}>
        {isCompleted ? <MdDone size="1.5em" /> : stepNumber + 1}
      </figure>
      {!shouldShowLine ? <figure className={stepLineClasses} /> : null}
    </>
  );
};

const WizardNav = ({ steps }) => {
  const { pathname } = useLocation();
  const activeStep = steps.map(({ path }) => path).indexOf(pathname.slice(1));
  const isTheLastOne = activeStep + 1 === steps.length;

  return !isTheLastOne ? (
    <nav className="wizard--nav">
      {activeStep > -1 &&
        steps.map((step, index) => (
          <WizardStep
            key={step.path}
            step={step}
            stepNumber={index}
            shouldShowLine={index + 1 === steps.length}
            isCompleted={index < activeStep}
          />
        ))}
    </nav>
  ) : null;
};

export default WizardNav;
