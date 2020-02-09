import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dataSuppliers';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedDataSupplierAdd, { DataSupplierAdd } from './Add';
import { withMemoryRouter } from 'utils';

describe('Dashboard <DataSupplierAdd />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const name = 'Super';
  const mockStore = configureStore();
  const store = mockStore({
    dataSuppliers: initialState,
    dashboard: dashboardInitialState
  });
  const actions = {
    selectDashboard: jest.fn(),
    createDataSupplier: jest.fn()
  };
  const RoutedDataSupplierAdd = withMemoryRouter(ConnectedDataSupplierAdd);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedDataSupplierAdd layoutOptions={defaultLayoutOptions} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DataSupplierAdd
          actions={actions}
          layoutOptions={defaultLayoutOptions}
        />
      </Provider>
    );
    const { instance } = component.root.findByType(DataSupplierAdd);

    expect(instance).toBeDefined();
    instance.handleSubmit({ name });
    expect(actions.createDataSupplier).toHaveBeenCalledWith({ name });
    expect(actions.selectDashboard).toHaveBeenCalledWith({
      name: 'DataSuppliers'
    });
  });
});
