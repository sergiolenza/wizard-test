import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PasswordManagerInfo from './PasswordManagerInfo';

const wizardState = {
  legalAge: false,
  firstPassword: '',
  secondPassword: '',
  hint: '',
};

const setWizardState = jest.fn();

const renderPasswordManagerInfo = (state = wizardState, setState = setWizardState) =>
  render(
    <Router>
      <PasswordManagerInfo wizardState={state} setWizardState={setState} />
    </Router>
  );

describe('PasswordManagerInfo view', () => {
  it('should render the article', async () => {
    renderPasswordManagerInfo();
    const article = await screen.findByRole('article', { name: 'password-manager-info' });
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('wizard--content');
  });
  it('should render the footer', async () => {
    renderPasswordManagerInfo();
    const footer = await screen.findByRole('contentinfo', { name: 'wizard-footer' });
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('wizard--footer');
  });
  it('should render the legal age checkbox', async () => {
    renderPasswordManagerInfo();
    const checkbox = await screen.findByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass('checkbox--field');
  });
  it('should disable next button if the checkbox is not checked', async () => {
    renderPasswordManagerInfo();
    const footer = await screen.findByRole('contentinfo', { name: 'wizard-footer' });
    const nextButton = footer.lastChild;
    expect(nextButton).toHaveAttribute('disabled');
  });
  it('should enable next button if the checkbox is checked', async () => {
    renderPasswordManagerInfo({
      legalAge: true,
      firstPassword: '',
      secondPassword: '',
      hint: '',
    });
    const footer = await screen.findByRole('contentinfo', { name: 'wizard-footer' });
    const nextButton = footer.lastChild;
    expect(nextButton).not.toHaveAttribute('disabled');
  });
});
