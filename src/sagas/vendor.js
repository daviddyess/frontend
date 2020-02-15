import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { getVendor } from 'selectors/vendor';
import { actions, types } from 'reducers/vendor';
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

function* createVendorWorker({ details: { name, slug, code } }) {
  try {
    const endpoint = {
      url: '/vendor',
      method: 'POST'
    };
    const data = {
      name,
      slug,
      code
    };
    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(
        toastActions.popToast({
          title: 'Vendor Created',
          icon: 'times-circle',
          message: `${name} vendor successfully created!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to create vendor!');
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

function* updateVendorWorker({ details: { vendorId, name, slug, code } }) {
  try {
    const endpoint = {
      url: `/vendor/${vendorId}`,
      method: 'PUT'
    };
    const data = {
      name,
      slug,
      code
    };
    const result = yield call(request.execute, { endpoint, data });

    // update vendors in state or throw an error
    if (result.success) {
      yield put(
        toastActions.popToast({
          title: 'Edit Vendor',
          icon: 'times-circle',
          message: `${name} vendor successfully updated!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to update vendor!');
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

function* deleteVendorWorker({ vendorId, name }) {
  try {
    const endpoint = {
      url: `/vendor/${vendorId}`,
      method: 'DELETE'
    };
    const result = yield call(request.execute, { endpoint });

    // update vendors in state or throw an error
    if (result.success) {
      yield put(
        toastActions.popToast({
          title: 'Delete Vendor',
          icon: 'times-circle',
          message: `${name} vendor successfully deleted!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to delete vendor!');
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

function* createVendorWatcher() {
  yield takeLatest(types.CREATE_VENDOR, createVendorWorker);
}

function* updateVendorWatcher() {
  yield takeLatest(types.UPDATE_VENDOR, updateVendorWorker);
}

function* deleteVendorWatcher() {
  yield takeLatest(types.DELETE_VENDOR, deleteVendorWorker);
}

export const workers = {
  requestVendorWorker,
  createVendorWorker,
  updateVendorWorker,
  deleteVendorWorker
};

export const watchers = {
  requestVendorWatcher,
  createVendorWatcher,
  updateVendorWatcher,
  deleteVendorWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
