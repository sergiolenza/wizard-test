import { render, screen } from '@testing-library/react';
import TextTitle from './TextTitle';

describe('TextTitle component', () => {
  it('should render the h1', async () => {
    render(<TextTitle>test</TextTitle>);
    const h1 = await screen.findByRole('heading');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveClass('text-title');
  });
  it('should render the underline', async () => {
    render(<TextTitle>test</TextTitle>);
    const underline = await screen.findByRole('figure', { name: 'text-title-underline' });
    expect(underline).toBeInTheDocument();
    expect(underline).toHaveClass('text-title-figure');
  });
});
