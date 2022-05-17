import { render, screen } from '@testing-library/react';
import NoMatch from './NoMatch';

describe('NoMatch component', () => {
  it('does render the NoMatch', async () => {
    render(<NoMatch />);
    const noMatch = await screen.findByRole('article', { name: 'no-match' });
    expect(noMatch).toBeInTheDocument();
  });
});
