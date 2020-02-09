import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/flavors';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedFlavorEdit, { FlavorEdit } from './Edit';
import { withMemoryRouter } from 'utils';

describe('Dashboard <FlavorEdit />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const flavorId = 20;
  const name = 'Luser';
  const mockStore = configureStore();
  const store = mockStore({
    flavors: initialState,
    dashboard: dashboardInitialState
  });
  const actions = {
    selectDashboard: jest.fn(),
    updateFlavor: jest.fn()
  };
  const RoutedFlavorEdit = withMemoryRouter(ConnectedFlavorEdit);

  it('renders correctly', () => {
    const props = {
      layoutOptions: defaultLayoutOptions,
      flavorId,
      name
    };

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedFlavorEdit {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const props = {
      actions,
      layoutOptions: defaultLayoutOptions,
      flavorId,
      name
    };
    const component = renderer.create(
      <Provider store={store}>
        <FlavorEdit {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(FlavorEdit);

    expect(instance).toBeDefined();
    instance.handleSubmit({ name });
    expect(actions.updateFlavor).toHaveBeenCalledWith({
      flavorId,
      name
    });
    expect(actions.selectDashboard).toHaveBeenCalledWith({
      name: 'Flavors'
    });
  });
});
