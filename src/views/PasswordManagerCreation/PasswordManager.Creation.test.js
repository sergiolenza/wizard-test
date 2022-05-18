import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import PasswordManagerCreation from './PasswordManagerCreation';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // useHistory: () => ({
  //   push: jest.fn(),
  //   replace: jest.fn(),
  // }),
  useNavigate: jest.fn(),
}));

const wizardState = {
  legalAge: false,
  firstPassword: '',
  secondPassword: '',
  hint: '',
};

const setWizardState = jest.fn();

const renderPasswordManagerCreation = () =>
  render(
    <Router>
      <PasswordManagerCreation wizardState={wizardState} setWizardState={setWizardState} />
    </Router>
  );

xdescribe('PasswordManagerCreation view', () => {
  it('does render the form', async () => {
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
  it('should not navigate if there are empty passwords', async () => {
    renderPasswordManagerCreation();
    const footer = await screen.findByRole('contentinfo', { name: 'wizard-footer' });
    const submitButton = footer.lastChild;
    userEvent.click(submitButton);
    expect(useNavigate).toHaveBeenCalled();
    expect(useNavigate).toHaveBeenCalledTimes(1);
  });
  it('should navigate if there are correct passwords', async () => {
    renderPasswordManagerCreation();
    const footer = await screen.findByRole('contentinfo', { name: 'wizard-footer' });
    const submitButton = footer.lastChild;

    const input = await screen.findAllByRole('textbox');
    screen.debug(input);

    userEvent.click(submitButton);
    expect(useNavigate).toHaveBeenCalled();
    expect(useNavigate).toHaveBeenCalledTimes(1);
  });
});
