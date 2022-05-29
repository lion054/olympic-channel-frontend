import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Home from '../scenes/Home';
import { mockFetch } from './helpers';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

test("Should render Home scene on default route", async () => {
  window.fetch = mockFetch([{
    game_id: 4,
    city: "Pyongchang",
    year: 2018,
    athletes: [{
      athlete_id: 1,
      name: "Arianna",
      surname: "Fontana",
      date_of_birth: "14/04/1990",
      height: 164,
      weight: 63,
      bio: "Arianna Fontana OMRI (born April 14, 1990)"
    }]
  }]);

  render(<Home />);

  // before assertion, wait for component update to fully complete
  await waitFor(() => {
    expect(screen.getByText(/Olympic Athletes/i)).toBeInTheDocument();
  });
});
