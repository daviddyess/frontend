import React from 'react';
import renderer from 'react-test-renderer';
import { Vendors } from './Vendors';
import { withMemoryRouter } from 'utils';
// Prevent findDOMNode error in test from Dropdown component in react-bootstrap
jest.mock('react-dom', () => ({
  findDOMNode: () => ({})
}));

describe('Dashboard <Vendors />', () => {
  const props = {
    layoutOptions: {
      border: false,
      header: true,
      title: false,
      style: {}
    },
    collection: [],
    pager: {}
  };

  const RoutedVendors = withMemoryRouter(Vendors);

  it('renders correctly', () => {
    expect(
      renderer.create(<RoutedVendors {...props} />).toJSON()
    ).toMatchSnapshot();
  });
});
