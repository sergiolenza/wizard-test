import { render, screen } from '@testing-library/react';
import PasswordStrengthBar from './PasswordStrengthBar';

describe('PasswordStrengthBar component', () => {
  it('should render the PasswordStrengthBar', async () => {
    render(<PasswordStrengthBar strength={0} />);
    const passwordStrengthBar = await screen.findByRole('figure', {
      name: 'password-strength-bar',
    });
    expect(passwordStrengthBar).toBeInTheDocument();
  });
  it('should have the too-weak class by default', async () => {
    render(<PasswordStrengthBar />);
    const passwordStrengthBar = await screen.findByRole('figure', {
      name: 'password-strength-bar',
    });
    expect(passwordStrengthBar).toHaveClass('too-weak');
    expect(passwordStrengthBar).not.toHaveClass('weak');
    expect(passwordStrengthBar).not.toHaveClass('medium');
    expect(passwordStrengthBar).not.toHaveClass('strong');
  });
  it('should have the too-weak class', async () => {
    render(<PasswordStrengthBar strength={0} />);
    const passwordStrengthBar = await screen.findByRole('figure', {
      name: 'password-strength-bar',
    });
    expect(passwordStrengthBar).toHaveClass('too-weak');
    expect(passwordStrengthBar).not.toHaveClass('weak');
    expect(passwordStrengthBar).not.toHaveClass('medium');
    expect(passwordStrengthBar).not.toHaveClass('strong');
  });
  it('should have the weak class', async () => {
    render(<PasswordStrengthBar strength={1} />);
    const passwordStrengthBar = await screen.findByRole('figure', {
      name: 'password-strength-bar',
    });
    expect(passwordStrengthBar).not.toHaveClass('too-weak');
    expect(passwordStrengthBar).toHaveClass('weak');
    expect(passwordStrengthBar).not.toHaveClass('medium');
    expect(passwordStrengthBar).not.toHaveClass('strong');
  });
  it('should have the medium class', async () => {
    render(<PasswordStrengthBar strength={2} />);
    const passwordStrengthBar = await screen.findByRole('figure', {
      name: 'password-strength-bar',
    });
    expect(passwordStrengthBar).not.toHaveClass('too-weak');
    expect(passwordStrengthBar).not.toHaveClass('weak');
    expect(passwordStrengthBar).toHaveClass('medium');
    expect(passwordStrengthBar).not.toHaveClass('strong');
  });
  it('should have the strong class', async () => {
    render(<PasswordStrengthBar strength={3} />);
    const passwordStrengthBar = await screen.findByRole('figure', {
      name: 'password-strength-bar',
    });
    expect(passwordStrengthBar).not.toHaveClass('too-weak');
    expect(passwordStrengthBar).not.toHaveClass('weak');
    expect(passwordStrengthBar).not.toHaveClass('medium');
    expect(passwordStrengthBar).toHaveClass('strong');
  });
});
