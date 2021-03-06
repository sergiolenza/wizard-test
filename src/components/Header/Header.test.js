import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('should render the Header', async () => {
    render(<Header />);
    const header = await screen.findByRole('banner', { name: 'header' });
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });
});
