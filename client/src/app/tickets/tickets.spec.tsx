import { render } from '@testing-library/react';

import Tickets from '.';

describe('Tickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tickets />);
    expect(baseElement).toBeTruthy();
  });
});
