/* eslint-disable no-undef */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import Query from '../utils/query';
import App from '../App';

const mocks = [
  {
    request: {
      query: Query('USD'),
    },
    result: {
      data: {
        products: [
          {
            id: 1, image_url: 'http://test.com/jpg', price: 120, title: 'Pef one',
          },
        ],
      },
    },
  },
];

test('Render loading while fetching products', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );

  const searchingText = screen.getByText(/loading/i);
  expect(searchingText).toBeInTheDocument();
});

test('renders all product', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );
  const promise = new Promise((resolve) => setTimeout(resolve, 20));
  await act(() => promise);
  const projects = await container.getElementsByClassName('product-item');
  expect(projects).toHaveLength(1);
});

test('Renders overlay only when button is clicked', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );

  const promise = new Promise((resolve) => setTimeout(resolve, 20));
  await act(() => promise);

  let getOverlay = await container.getElementsByClassName('overlay');
  expect(getOverlay).toHaveLength(0);

  userEvent.click(screen.getByText('Add to Cart'));

  getOverlay = await container.getElementsByClassName('overlay');
  expect(getOverlay).toHaveLength(1);
});

test('Increment cart price when added twice', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );

  const promise = new Promise((resolve) => setTimeout(resolve, 20));
  await act(() => promise);

  userEvent.click(screen.getByText('Add to Cart'));
  userEvent.click(screen.getByText('Add to Cart'));
  const price = screen.getByText('$240.00');
  expect(price).toBeInTheDocument();
});
