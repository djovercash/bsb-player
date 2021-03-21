import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bsb title', () => {
	render(<App />);
	const linkElement = screen.getByText(/BSB/i);
	expect(linkElement).toBeInTheDocument();
});
