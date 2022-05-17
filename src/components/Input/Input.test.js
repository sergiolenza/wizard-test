import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const mockOnChangeFn = jest.fn();

const renderInput = () => render(<Input placeholder="test" onChange={mockOnChangeFn} />);

describe('Input component', () => {
  it('does render the Input', async () => {
    renderInput();
    const input = await screen.findByPlaceholderText('test');
    expect(input).toBeInTheDocument();
  });
  it('does call the onChange function', async () => {
    renderInput();
    const input = await screen.findByPlaceholderText('test');
    await userEvent.type(input, 'test 2');
    expect(input).toHaveValue('test 2');
    expect(mockOnChangeFn).toHaveBeenCalled();
  });
});
