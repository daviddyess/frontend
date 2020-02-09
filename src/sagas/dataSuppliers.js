import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  getDataSupplier,
  getCachedDataSuppliers,
  getDataSuppliersPager
} from 'selectors/dataSuppliers';
import { actions, types } from 'reducers/dataSuppliers';
import { actions as toastActions } from 'reducers/toast';

function* requestDataSupplierWorker({ dataSupplierId }) {
  try {
    const dataSupplier = yield select(getDataSupplier);

    if (dataSupplier.length === 0 || dataSupplier.id !== dataSupplierId) {
      const endpoint = {
        url: `/data/supplier/${dataSupplierId}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: { data }
        } = result;

        yield put(actions.requestDataSupplierSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get dataSupplier!');
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

function* requestDataSuppliersWorker({ pager }) {
  try {
    const dataSuppliersPager = yield select(getDataSuppliersPager);

    // Initial/previous values stored
    let { count, limit, page } = dataSuppliersPager;
    const { pages } = dataSuppliersPager;

    let endpoint = {};

    if (!count) {
      endpoint = {
        url: '/data/suppliers/count',
        method: 'GET'
      };
      const dataSuppliersCount = yield call(request.execute, { endpoint });

      if (dataSuppliersCount.success) {
        const {
          response: { data }
        } = dataSuppliersCount;
        // Set pager to be passed into Success, Update count

        pager.count = data;
      } else if (dataSuppliersCount.error) {
        throw dataSuppliersCount.error;
      } else {
        throw new Error('Failed to count dataSuppliers!');
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

    const cached = yield select(getCachedDataSuppliers);

    if (
      !cached[page] ||
      (count > Number(limit) && cached[page].length !== Number(limit)) ||
      (count < Number(limit) && cached[page].length !== count)
    ) {
      let offset = page * limit - limit + 1;

      if (offset > count) {
        // Prevent an offset higher than total amount of dataSuppliers
        // - Consider a max limit/offset
        offset = count - limit;
      }
      endpoint = {
        url: `/data/suppliers/?limit=${limit}&offset=${offset}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update dataSuppliers in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        cached[page] = data;

        yield put(actions.requestDataSuppliersSuccess(cached, pager));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get dataSuppliers!');
      }
    } else {
      yield put(actions.requestDataSuppliersSuccess(cached, pager));
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

function* requestDataSupplierWatcher() {
  yield takeLatest(types.REQUEST_DATA_SUPPLIER, requestDataSupplierWorker);
}

function* requestDataSuppliersWatcher() {
  yield takeLatest(types.REQUEST_DATA_SUPPLIERS, requestDataSuppliersWorker);
}

export const workers = {
  requestDataSupplierWorker,
  requestDataSuppliersWorker
};

export const watchers = {
  requestDataSupplierWatcher,
  requestDataSuppliersWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
