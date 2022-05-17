import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const mockClickFn = jest.fn();

describe('Button component', () => {
  it('does render the Button', async () => {
    render(<Button>Add to cart</Button>);
    const button = await screen.findByText('Add to cart');
    expect(button).toBeInTheDocument();
  });
  it('does call the onClick function', async () => {
    render(<Button onClick={mockClickFn}>Add to cart</Button>);
    const button = await screen.findByText('Add to cart');
    await userEvent.click(button);
    expect(mockClickFn).toHaveBeenCalled();
  });
});
