import { all, put, call, select } from 'redux-saga/effects';

import request from 'utils/request';
import { actions } from 'reducers/vendors';
import { actions as toastActions } from 'reducers/toast';
import saga, { watchers, workers } from './vendors';
import { getCachedVendors, getVendorsPager } from 'selectors/vendors';

describe('vendors sagas', () => {
  const vendors = { vendors: true };

  const vendorsEndpoint = {
    url: '/vendors/?limit=20&offset=1',
    method: 'GET'
  };
  const countEndpoint = {
    url: '/vendors/count',
    method: 'GET'
  };
  /*
  const createVendorEndpoint = {
    url: '/vendor',
    method: 'POST'
  };
  */

  const count = 25;

  const pager = {
    count: 25,
    limit: 20,
    page: 1,
    pages: 2
  };

  it('handles success in requestVendorsWorker', () => {
    const gen = workers.requestVendorsWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getVendorsPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: 25
      }
    });

    expect(result.value).toEqual(select(getCachedVendors));

    result = gen.next(vendors);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: vendorsEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: vendors
      }
    });

    expect(result.value).toEqual(
      put(actions.requestVendorsSuccess(vendors, pager))
    );
  });

  it('handles request failure in requestVendorsWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestVendorsWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getVendorsPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: 25
      }
    });

    expect(result.value).toEqual(select(getCachedVendors));

    result = gen.next(vendors);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: vendorsEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in requestVendorsWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestVendorsWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getVendorsPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: 25
      }
    });

    expect(result.value).toEqual(select(getCachedVendors));

    result = gen.next(vendors);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: vendorsEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Error',
          icon: 'times-circle',
          message
        })
      )
    );
  });

  it('forks all watchers', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map(watcher => watcher()))
    );
  });
});
