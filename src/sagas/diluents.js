import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  getDiluent,
  getCachedDiluents,
  getDiluentsPager
} from 'selectors/diluents';
import { actions, types } from 'reducers/diluents';
import { actions as toastActions } from 'reducers/toast';

function* requestDiluentWorker({ diluentId }) {
  try {
    const diluent = yield select(getDiluent);

    if (diluent.length === 0 || diluent.diluentId !== diluentId) {
      const endpoint = {
        url: `/diluent/${diluentId}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: { data }
        } = result;

        // eslint-disable-next-line no-console
        console.log(data);
        yield put(actions.requestDiluentSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get diluent!');
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

function* requestDiluentsWorker({ pager }) {
  try {
    const diluentsPager = yield select(getDiluentsPager);

    // Initial/previous values stored
    let { count, limit, page } = diluentsPager;
    const { pages } = diluentsPager;

    let endpoint = {};

    if (!count) {
      endpoint = {
        url: '/diluents/count',
        method: 'GET'
      };
      const diluentsCount = yield call(request.execute, { endpoint });

      if (diluentsCount.success) {
        const {
          response: { data }
        } = diluentsCount;
        // Set pager to be passed into Success, Update count

        pager.count = data;
      } else if (diluentsCount.error) {
        throw diluentsCount.error;
      } else {
        throw new Error('Failed to count diluents!');
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

    const cached = yield select(getCachedDiluents);

    if (
      !cached[page] ||
      (count > Number(limit) && cached[page].length !== Number(limit)) ||
      (count < Number(limit) && cached[page].length !== count)
    ) {
      let offset = page * limit - limit + 1;

      if (offset > count) {
        // Prevent an offset higher than total amount of diluents
        // - Consider a max limit/offset
        offset = count - limit;
      }
      endpoint = {
        url: `/diluents/?limit=${limit}&offset=${offset}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update diluents in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        cached[page] = data;

        yield put(actions.requestDiluentsSuccess(cached, pager));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get diluents!');
      }
    } else {
      yield put(actions.requestDiluentsSuccess(cached, pager));
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

function* requestDiluentWatcher() {
  yield takeLatest(types.REQUEST_DILUENT, requestDiluentWorker);
}

function* requestDiluentsWatcher() {
  yield takeLatest(types.REQUEST_DILUENTS, requestDiluentsWorker);
}

export const workers = {
  requestDiluentWorker,
  requestDiluentsWorker
};

export const watchers = {
  requestDiluentWatcher,
  requestDiluentsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
