import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PasswordManagerInfo from './PasswordManagerInfo';

const renderPasswordManagerInfo = () =>
  render(
    <Router>
      <PasswordManagerInfo />
    </Router>
  );

describe('PasswordManagerInfo component', () => {
  it('does render the PasswordManagerInfo', async () => {
    renderPasswordManagerInfo();
    const passwordManagerInfo = await screen.findByRole('article', {
      name: 'password-manager-info',
    });
    expect(passwordManagerInfo).toBeInTheDocument();
  });
});
