import { render, screen } from '@testing-library/react';
import Column from './Column'; // Adjust the path to your actual file
import { TodoHeader, CompletedHeader } from './headers';
import Ticket from './Ticket';
import { IColumn, ITicket } from 'client/src/types';

// Mocking react-beautiful-dnd components
jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }: { children: any }) => (
    <div>{children({ innerRef: jest.fn(), droppableProps: {} })}</div>
  ),
  Draggable: ({ children }: { children: any }) => (
    <div>
      {children({
        innerRef: jest.fn(),
        draggableProps: {},
        dragHandleProps: {},
      })}
    </div>
  ),
}));

// Mocking the Ticket component
jest.mock('./Ticket', () => (props: ITicket) => (
  <div>{props.completed ? 'Done' : 'Todo'}</div>
));

// Mocking the headers
jest.mock('./headers', () => ({
  TodoHeader: jest.fn(() => <div>TodoHeader</div>),
  CompletedHeader: jest.fn(() => <div>CompletedHeader</div>),
}));

describe('Column Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockColumn: IColumn[] = [
    {
      id: 'todo',
      total: 2,
      tickets: [
        {
          id: 1,
          description: 'First ticket',
          assigneeId: null,
          completed: false,
        },
        {
          id: 2,
          description: 'Second ticket',
          assigneeId: null,
          completed: false,
        },
      ],
      className: 'custom-class',
    },
    {
      id: 'completed',
      total: 2,
      tickets: [
        {
          id: 1,
          description: 'First Completed',
          assigneeId: null,
          completed: true,
        },
        {
          id: 2,
          description: 'Second Completed',
          assigneeId: null,
          completed: true,
        },
      ],
      className: 'custom-class',
    },
  ];

  test('renders the column with TodoHeader and tickets', () => {
    render(
      <>
        <Column props={mockColumn[0]} isFetching={false} />
        <Column props={mockColumn[1]} isFetching={false} />
      </>
    );

    // Check that the correct header is rendered
    expect(screen.getByText('TodoHeader')).toBeInTheDocument();
    expect(screen.getByText('CompletedHeader')).toBeInTheDocument();

    // Check that tickets are rendered
    expect(screen.getAllByText('Done')).toHaveLength(2);
  });
});
