import { render, screen } from '@testing-library/react';
import Placeholder from './Placeholder';

const renderPlaceholder = () =>
  render(<Placeholder icon="test" primaryText="primary text" secondaryText="secondary text" />);

describe('Placeholder component', () => {
  it('does render the Placeholder', async () => {
    renderPlaceholder();
    const placeholder = await screen.findByText('test');
    expect(placeholder).toBeInTheDocument();
  });
  it('does render all the props', async () => {
    renderPlaceholder();
    const icon = await screen.findByText('test');
    expect(icon).toBeInTheDocument();
    const primaryText = await screen.findByText('primary text');
    expect(primaryText).toBeInTheDocument();
    const secondaryText = await screen.findByText('secondary text');
    expect(secondaryText).toBeInTheDocument();
  });
});
