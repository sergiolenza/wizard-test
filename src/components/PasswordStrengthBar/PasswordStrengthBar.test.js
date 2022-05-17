import { render, screen } from '@testing-library/react';
import PasswordStrengthBar from './PasswordStrengthBar';

const renderPasswordStrengthBar = () => render(<PasswordStrengthBar strength={0} />);

describe('PasswordStrengthBar component', () => {
  it('does render the PasswordStrengthBar', async () => {
    renderPasswordStrengthBar();
    const passwordStrengthBar = await screen.findByRole('figure', {
      name: 'password-strength-bar',
    });
    expect(passwordStrengthBar).toBeInTheDocument();
  });
  it('does have the proper class', async () => {
    const { container } = renderPasswordStrengthBar();
    expect(container.firstChild.classList.contains('too-weak')).toBe(true);
  });
});
