// Mocking useQueryClient
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
}));
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query';
import CreateTicket from './CreateTicket';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

//testing the wrapper aka the QueryClientProvider.
const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('Create Ticket Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  //Rendering: Create button.
  test('Should render the create ticket button', () => {
    (useMutation as jest.Mock).mockReturnValue({ mutateAsync: jest.fn() });
    renderWithQueryClient(<CreateTicket />);
    //create button
    const createButton = screen.getByText(/create/i);
    expect(createButton).toBeInTheDocument();
  });

  //Rendering: Create Modal.
  test('Should open create ticket modal, when button clicking', () => {
    (useMutation as jest.Mock).mockReturnValue({ mutateAsync: jest.fn() });
    renderWithQueryClient(<CreateTicket />);
    //create button
    const createButton = screen.getByText(/create/i);
    fireEvent.click(createButton);
    const modal = screen.getByText(/create new ticket/i);
    expect(modal).toBeInTheDocument();
  });

  //Form Validation.
  //case 1: submitting without description value.
  test('Should show validation if the value of description field is too short', async () => {
    (useMutation as jest.Mock).mockReturnValue({ mutateAsync: jest.fn() });
    renderWithQueryClient(<CreateTicket />);
    fireEvent.click(screen.getByText(/create/i)); // Open modal
    const submitButton = screen.getByText(/Done/i);
    fireEvent.click(submitButton);
    //submitting without value of description.
    const errorMessage = await screen.findByText(
      /The description field is mandatory/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  //case 2: submitting with wrong format.
  test('Should show `Wrong text format`', async () => {
    (useMutation as jest.Mock).mockReturnValue({ mutateAsync: jest.fn() });
    renderWithQueryClient(<CreateTicket />);
    fireEvent.click(screen.getByText(/create/i)); // Open modal
    // the input field.
    const descriptionInput = screen.getByPlaceholderText(/What is the task?/i);
    fireEvent.change(descriptionInput, {
      target: { value: '       ' }, // 7 characters are all space.
    });
    const submitButton = screen.getByText(/Done/i);
    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText(/Wrong text format/i);
    expect(errorMessage).toBeInTheDocument();
  });

  //Summit
  test('Should the mutateAsync be called with correct arguments', async () => {
    const mutateAsync = jest.fn().mockResolvedValueOnce({});
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync,
    });

    renderWithQueryClient(<CreateTicket />);
    fireEvent.click(screen.getByText(/create/i)); // Open modal
    // the input field.
    const descriptionInput = screen.getByPlaceholderText(/What is the task?/i);
    fireEvent.change(descriptionInput, {
      target: { value: 'the new data of description' }, // 7 characters are all space.
    });
    const submitButton = screen.getByText(/Done/i);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledTimes(1);
      expect(mutateAsync).toHaveBeenCalledWith({
        description: 'the new data of description',
      });
    });
  });
});
