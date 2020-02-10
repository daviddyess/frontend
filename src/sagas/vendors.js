import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  getVendor,
  getCachedVendors,
  getVendorsPager
} from 'selectors/vendors';
import { actions, types } from 'reducers/vendors';
import { actions as toastActions } from 'reducers/toast';

function* requestVendorWorker({ vendorId }) {
  try {
    const vendor = yield select(getVendor);

    if (vendor.length === 0 || vendor.vendorId !== vendorId) {
      const endpoint = {
        url: `/vendor/${vendorId}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: { data }
        } = result;

        // eslint-disable-next-line no-console
        console.log(data);
        yield put(actions.requestVendorSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get vendor!');
      }
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestVendorsWorker({ pager }) {
  try {
    const vendorsPager = yield select(getVendorsPager);

    // Initial/previous values stored
    let { count, limit, page } = vendorsPager;
    const { pages } = vendorsPager;

    let endpoint = {};

    if (!count) {
      endpoint = {
        url: '/vendors/count',
        method: 'GET'
      };
      const vendorsCount = yield call(request.execute, { endpoint });

      if (vendorsCount.success) {
        const {
          response: { data }
        } = vendorsCount;
        // Set pager to be passed into Success, Update count

        pager.count = data;
      } else if (vendorsCount.error) {
        throw vendorsCount.error;
      } else {
        throw new Error('Failed to count vendors!');
      }
    } else {
      pager.count = count;
    }

    if (!pager.limit) {
      pager.limit = limit;
    }

    pager.pages =
      !pages || pages === null || pager.limit !== limit
        ? Math.ceil(pager.count / pager.limit)
        : pages;

    if (!pager.page) {
      pager.page = page;
    }
    // Refresh these values to the desired values (from pager)
    count = pager.count;
    limit = pager.limit;
    page = pager.page;

    const cached = yield select(getCachedVendors);

    if (!cached[page] || cached[page].length !== Number(limit)) {
      let offset = page * limit - limit + 1;

      if (offset > count) {
        // Prevent an offset higher than total amount of vendors
        // - Consider a max limit/offset
        offset = count - limit;
      }
      endpoint = {
        url: `/vendors/?limit=${limit}&offset=${offset}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update vendors in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        cached[page] = data;

        yield put(actions.requestVendorsSuccess(cached, pager));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get vendors!');
      }
    } else {
      yield put(actions.requestVendorsSuccess(cached, pager));
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestVendorWatcher() {
  yield takeLatest(types.REQUEST_VENDOR, requestVendorWorker);
}

function* requestVendorsWatcher() {
  yield takeLatest(types.REQUEST_VENDORS, requestVendorsWorker);
}

export const workers = {
  requestVendorWorker,
  requestVendorsWorker
};

export const watchers = {
  requestVendorWatcher,
  requestVendorsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
