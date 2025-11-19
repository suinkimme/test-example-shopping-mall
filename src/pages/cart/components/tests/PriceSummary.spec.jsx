import { screen } from '@testing-library/react';
import { vi } from 'node_modules/vitest/dist/index';
import React from 'react';

import PriceSummary from '@/pages/cart/components/PriceSummary';
import { mockUseCartStore } from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

beforeEach(() => {
  mockUseCartStore({
    cart: {
      6: {
        id: 6,
        title: 'Handmade Cotton Fish',
        price: 100,
        count: 3,
      },
    },
    totalCount: 3,
    totalPrice: 300,
  });
});

it('총 상품 금액은 "$300.00"로 노출된다', async () => {
  await render(<PriceSummary />);

  expect(screen.getByText('$300.00')).toBeInTheDocument();
});

it('총 상품 개수는 "3개"로 노출된다', async () => {
  await render(<PriceSummary />);

  expect(screen.getByText('3개')).toBeInTheDocument();
});
