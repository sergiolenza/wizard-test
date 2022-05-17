import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PasswordManagerCreation from './PasswordManagerCreation';

const renderPasswordManagerCreation = () =>
  render(
    <Router>
      <PasswordManagerCreation />
    </Router>
  );

describe('PasswordManagerCreation component', () => {
  it('does render the PasswordManagerCreation', async () => {
    renderPasswordManagerCreation();
    const passwordManagerCreation = await screen.findByRole('form', {
      name: 'password-manager-creation',
    });
    expect(passwordManagerCreation).toBeInTheDocument();
  });
});
