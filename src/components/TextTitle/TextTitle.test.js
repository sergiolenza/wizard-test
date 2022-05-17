import { render, screen } from '@testing-library/react';
import TextTitle from './TextTitle';

describe('TextTitle component', () => {
  it('does render the TextTitle', async () => {
    render(<TextTitle>testing</TextTitle>);
    const textTitle = await screen.findByText('testing');
    expect(textTitle).toBeInTheDocument();
  });
});
