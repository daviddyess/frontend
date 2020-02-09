import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dataSuppliers';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedDataSupplierEdit, { DataSupplierEdit } from './Edit';
import { withMemoryRouter } from 'utils';

describe('Dashboard <DataSupplierEdit />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const dataSupplierId = 20;
  const name = 'Luser';
  const mockStore = configureStore();
  const store = mockStore({
    dataSuppliers: initialState,
    dashboard: dashboardInitialState
  });
  const actions = {
    selectDashboard: jest.fn(),
    updateDataSupplier: jest.fn()
  };
  const RoutedDataSupplierEdit = withMemoryRouter(ConnectedDataSupplierEdit);

  it('renders correctly', () => {
    const props = {
      layoutOptions: defaultLayoutOptions,
      dataSupplierId,
      name
    };

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedDataSupplierEdit {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const props = {
      actions,
      layoutOptions: defaultLayoutOptions,
      dataSupplierId,
      name
    };
    const component = renderer.create(
      <Provider store={store}>
        <DataSupplierEdit {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(DataSupplierEdit);

    expect(instance).toBeDefined();
    instance.handleSubmit({ name });
    expect(actions.updateDataSupplier).toHaveBeenCalledWith({
      dataSupplierId,
      name
    });
    expect(actions.selectDashboard).toHaveBeenCalledWith({
      name: 'DataSuppliers'
    });
  });
});
