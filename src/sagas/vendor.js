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

function* requestVendorWatcher() {
  yield takeLatest(types.REQUEST_VENDOR, requestVendorWorker);
}

export const workers = {
  requestVendorWorker
};

export const watchers = {
  requestVendorWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
