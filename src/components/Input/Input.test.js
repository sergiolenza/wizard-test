import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const mockOnChangeFn = jest.fn();

describe('Input component', () => {
  it('should render the input container', async () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('input-container');
  });
  it('should have the full-width class', async () => {
    const { container } = render(<Input fullWidth />);
    expect(container.firstChild).toHaveClass('full-width');
  });
  it('should have the error class', async () => {
    const { container } = render(<Input error />);
    expect(container.firstChild).toHaveClass('has-error');
  });
  it('should render the input label', async () => {
    render(<Input label="label text" />);
    const input = await screen.findByText('label text');
    expect(input).toBeInTheDocument();
  });
  it('should render the input box', async () => {
    render(<Input />);
    const input = await screen.findByRole('textbox');
    expect(input.parentNode).toBeInTheDocument();
    expect(input.parentNode).toHaveClass('input--box');
  });
  it('should render the input field', async () => {
    render(<Input />);
    const input = await screen.findByRole('textbox');
    expect(input).toHaveClass('input--field');
  });
  it('should render the decorator', async () => {
    render(<Input type="password" />);
    const decorator = await screen.findByRole('figure', { name: 'input-box-decorator' });
    expect(decorator).toBeInTheDocument();
    expect(decorator).toHaveClass('input--box--decorator');
    expect(decorator).toHaveClass('password');
  });
  it('should render the strength bar', async () => {
    render(<Input type="password" value="abc" showStrength />);
    const strengthBar = await screen.findByRole('figure', { name: 'password-strength-bar' });
    expect(strengthBar).toBeInTheDocument();
    expect(strengthBar).toHaveClass('password-strength-bar');
  });
  it('should render the char counter', async () => {
    render(<Input type="text" value="abc" showCharCounter />);
    const charCounter = await screen.findByRole('status', { name: 'input-box-char-counter' });
    expect(charCounter).toBeInTheDocument();
    expect(charCounter).toHaveClass('input--box--char-counter');
  });
  it('should forward the rest of the props', async () => {
    render(<Input accept="audio/*" />);
    const input = await screen.findByRole('textbox');
    expect(input).toHaveAttribute('accept');
  });
  it('should have the active class', async () => {
    render(<Input />);
    const input = await screen.findByRole('textbox');
    await userEvent.click(input);
    const inputBox = input.parentNode;
    expect(inputBox).toHaveClass('input--box');
    expect(inputBox).toHaveClass('active');
    expect(inputBox).not.toHaveClass('error');
    expect(input).toHaveFocus();
    await userEvent.hover(input);
    expect(inputBox).toHaveClass('active');
    expect(inputBox).not.toHaveClass('error');
    expect(input).toHaveFocus();
  });
  it('should render the error placeholder', async () => {
    const { container } = render(<Input error="error" />);
    const inputContainer = container.lastChild;
    expect(inputContainer.lastChild).toBeInTheDocument();
    expect(inputContainer.lastChild).toHaveClass('input--error-placeholder');
  });
  it('should call the onChange function', async () => {
    render(<Input onChange={mockOnChangeFn} />);
    const input = await screen.findByRole('textbox');
    await userEvent.type(input, 'test 2');
    expect(input).toHaveValue('test 2');
    expect(mockOnChangeFn).toHaveBeenCalled();
  });
});
