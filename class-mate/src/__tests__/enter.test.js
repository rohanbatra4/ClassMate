import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Enter from '../modules/Enter';

describe('Enter', () => {
  it('renders the "Enter your Class Registration Numbers (CRNs)" heading', () => {
    render(<Enter />, { wrapper: MemoryRouter });
    expect(screen.getByText('Enter your Class Registration Numbers (CRNs):')).toBeInTheDocument();
  });

  it('renders the first CRN input field', () => {
    render(<Enter />, { wrapper: MemoryRouter });
    expect(screen.getByPlaceholderText('CRN #1')).toBeInTheDocument();
  });

  it('adds a new CRN input field when the "Add more CRNs" button is clicked', () => {
    render(<Enter />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('Add more CRNs'));
    expect(screen.getByPlaceholderText('CRN #2')).toBeInTheDocument();
  });

  it('renders the "Submit" button', () => {
    render(<Enter />, { wrapper: MemoryRouter });
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

  it('displays an alert when the "Submit" button is clicked without entering any CRNs', () => {
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Enter />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('Submit'));
    expect(spy).toHaveBeenCalledWith('Please enter at least one CRN');
    spy.mockRestore();
  });

  it('displays an alert when the "Submit" button is clicked without entering any CRNs', () => {
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Enter />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('Submit'));
    expect(spy).toHaveBeenCalledWith('Please enter at least one CRN');
    spy.mockRestore();
  });
});
