import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const mockClickFn = jest.fn();

describe('Button component', () => {
  it('should render the Button', async () => {
    render(<Button>Next</Button>);
    const button = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
  });
  it('should have the contained variant class', async () => {
    render(<Button variant="contained">Next</Button>);
    const button = await screen.findByRole('button');
    expect(button).toHaveClass('contained');
    expect(button).not.toHaveClass('text');
  });
  it('should have the text variant class', async () => {
    render(<Button variant="text">Next</Button>);
    const button = await screen.findByRole('button');
    expect(button).toHaveClass('text');
    expect(button).not.toHaveClass('contained');
  });
  it('should forward the rest of the props', async () => {
    render(
      <Button name="test-button" disabled>
        Next
      </Button>
    );
    const button = await screen.findByRole('button');
    expect(button).toHaveAttribute('name');
    expect(button).toHaveAttribute('disabled');
  });
  it('should call the onClick function when clicked', async () => {
    render(<Button onClick={mockClickFn}>Next</Button>);
    const button = await screen.findByRole('button');
    await userEvent.click(button);
    expect(mockClickFn).toHaveBeenCalled();
  });
});
