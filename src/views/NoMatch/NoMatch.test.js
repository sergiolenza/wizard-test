import { render, screen } from '@testing-library/react';
import NoMatch from './NoMatch';

describe('NoMatch component', () => {
  it('should render the NoMatch view', async () => {
    render(<NoMatch />);
    const noMatch = await screen.findByRole('article', { name: 'no-match' });
    expect(noMatch).toBeInTheDocument();
    expect(noMatch).toHaveClass('no-match');
  });
  it('should render the icon', async () => {
    render(<NoMatch />);
    const noMatch = await screen.findByRole('article', { name: 'no-match' });
    const svg = noMatch.firstChild;
    expect(svg).toBeInTheDocument();
  });
  it('should render the h1', async () => {
    render(<NoMatch />);
    const h1 = await screen.findByRole('heading', { name: 'no-match-text' });
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveClass('no-match--text');
  });
});
