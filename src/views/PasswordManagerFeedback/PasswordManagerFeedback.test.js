import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PasswordManagerFeedback from './PasswordManagerFeedback';

const mockedState = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    state: mockedState(),
  }),
}));

const renderPasswordManagerFeedback = () =>
  render(
    <Router>
      <PasswordManagerFeedback />
    </Router>
  );

describe('PasswordManagerFeedback view', () => {
  it('should render the article', async () => {
    mockedState.mockImplementation(() => ({ error: false }));
    renderPasswordManagerFeedback();
    const article = await screen.findByRole('article', {
      name: 'password-manager-feedback',
    });
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('wizard--content');
  });
  it('should render the footer', async () => {
    mockedState.mockImplementation(() => ({ error: false }));
    renderPasswordManagerFeedback();
    const footer = await screen.findByRole('contentinfo', { name: 'wizard-footer' });
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('wizard--footer');
  });
  it('should render the error placeholder when error', async () => {
    mockedState.mockImplementation(() => ({ error: true }));
    renderPasswordManagerFeedback();
    const placeholder = await screen.findByRole('banner', { name: 'placeholder' });
    expect(placeholder).toHaveClass('error');
  });
  it('should render the success placeholder when no error', async () => {
    mockedState.mockImplementation(() => ({ error: false }));
    renderPasswordManagerFeedback();
    const placeholder = await screen.findByRole('banner', { name: 'placeholder' });
    expect(placeholder).not.toHaveClass('error');
  });
});
