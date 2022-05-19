import { render, screen } from '@testing-library/react';
import TextSubtitle from './TextSubtitle';

describe('TextSubtitle component', () => {
  it('should render the h2', async () => {
    render(<TextSubtitle>test</TextSubtitle>);
    const h2 = await screen.findByRole('heading');
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveClass('text-subtitle');
  });
});
