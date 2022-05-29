import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Profile from '../scenes/Profile';
import { mockFetch } from './helpers';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

test("Should render Profile scene on default route", async () => {
  window.fetch = mockFetch({
    athlete_id: 1,
    name: "Arianna",
    surname: "Fontana",
    date_of_birth: "14/04/1990",
    height: 164,
    weight: 63,
    bio: "Arianna Fontana OMRI (born April 14, 1990)",
    results: [{
      game_id: 4,
      city: "Pyongchang",
      year: 2018,
      gold: 1,
      silver: 1,
      bronze: 1
    },{
      game_id: 5,
      city: "Sochi",
      year: 2014,
      gold: 0,
      silver: 1,
      bronze: 2
    },{
      game_id: 6,
      city: "Vancouver",
      year: 2010,
      gold: 0,
      silver: 0,
      bronze: 1
    },{
      game_id: 7,
      city: "Turin",
      year: 2006,
      gold: 0,
      silver: 0,
      bronze: 1
    }]
  });

  render(<Profile />);

  // before assertion, wait for component update to fully complete
  await waitFor(() => {
    expect(screen.getByText(/Vancouver/i)).toBeInTheDocument();
  });
});
