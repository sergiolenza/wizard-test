import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PasswordManagerFeedback from './PasswordManagerFeedback';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({ state: { error: false } }),
}));

const renderPasswordManagerFeedback = () =>
  render(
    <Router>
      <PasswordManagerFeedback />
    </Router>
  );

xdescribe('PasswordManagerFeedback component', () => {
  it('does render the PasswordManagerFeedback', async () => {
    renderPasswordManagerFeedback();
    const passwordManagerFeedback = await screen.findByRole('article', {
      name: 'password-manager-feedback',
    });
    expect(passwordManagerFeedback).toBeInTheDocument();
  });
});
