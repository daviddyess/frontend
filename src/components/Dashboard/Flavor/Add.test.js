import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/flavors';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedFlavorAdd, { FlavorAdd } from './Add';
import { withMemoryRouter } from 'utils';

describe('Dashboard <FlavorAdd />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const name = 'Super';
  const mockStore = configureStore();
  const store = mockStore({
    flavors: initialState,
    dashboard: dashboardInitialState
  });
  const actions = {
    selectDashboard: jest.fn(),
    createFlavor: jest.fn()
  };
  const RoutedFlavorAdd = withMemoryRouter(ConnectedFlavorAdd);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedFlavorAdd layoutOptions={defaultLayoutOptions} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <FlavorAdd actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(FlavorAdd);

    expect(instance).toBeDefined();
    instance.handleSubmit({ name });
    expect(actions.createFlavor).toHaveBeenCalledWith({ name });
    expect(actions.selectDashboard).toHaveBeenCalledWith({ name: 'Flavors' });
  });
});
