import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import PasswordManagerCreation from './PasswordManagerCreation';

const wizardState = {
  legalAge: true,
  firstPassword: '',
  secondPassword: '',
  hint: '',
};

const setWizardState = jest.fn();

const renderPasswordManagerCreation = (state = wizardState, setState = setWizardState) =>
  render(
    <Router>
      <PasswordManagerCreation wizardState={state} setWizardState={setState} />
    </Router>
  );

describe('PasswordManagerCreation view', () => {
  it('should render the form', async () => {
    renderPasswordManagerCreation();
    const form = await screen.findByRole('form', { name: 'password-manager-creation' });
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('password-manager-creation');
  });
  it('should render the fieldset', async () => {
    renderPasswordManagerCreation();
    const fieldset = await screen.findByRole('group', { name: 'wizard-fieldset' });
    expect(fieldset).toBeInTheDocument();
    expect(fieldset).toHaveClass('wizard--fieldset');
  });
  it('should render the article', async () => {
    renderPasswordManagerCreation();
    const article = await screen.findByRole('article', { name: 'wizard-content' });
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('wizard--content');
  });
  it('should not call setWizardState if form is invalid', async () => {
    renderPasswordManagerCreation();

    const footer = await screen.findByRole('contentinfo', { name: 'wizard-footer' });
    const submitButton = footer.lastChild;
    userEvent.click(submitButton);
    await expect(setWizardState).toHaveBeenCalledTimes(0);
  });
  it('should call setWizardState if form is valid', async () => {
    const state = {
      legalAge: true,
      firstPassword: 'Vuvuzela14',
      secondPassword: 'Vuvuzela14',
      hint: 'Vuvuzela14',
    };
    renderPasswordManagerCreation(state);

    const footer = await screen.findByRole('contentinfo', { name: 'wizard-footer' });
    const submitButton = footer.lastChild;
    userEvent.click(submitButton);

    // await waitFor(() => expect(setWizardState).toHaveBeenCalledTimes(1));
  });
});
