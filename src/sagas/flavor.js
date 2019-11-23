import { all, call, put, takeLatest, select, take } from 'redux-saga/effects';

import request from 'utils/request';
import { getUser } from 'selectors/application';
import { isLoaded } from 'selectors/flavor';
import { actions, types } from 'reducers/flavor';
import { actions as appActions, types as appTypes } from 'reducers/application';
import { actions as toastActions } from 'reducers/toast';

function* requestStashWorker() {
  try {
    const loaded = yield select(isLoaded);

    if (loaded) {
      return true;
    }

    let user = yield select(getUser);

    if (user === null) {
      yield put(appActions.requestCurrentUser());
      yield take([
        appTypes.REQUEST_CURRENT_USER_SUCCESS,
        appTypes.REQUEST_CURRENT_USER_FAILURE
      ]);
      user = yield select(getUser);
    }

    const endpoint = {
      url: `/user/${user.id}/flavors`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      const { data } = result.response;

      if (!data) {
        return yield put(actions.requestStashSuccess([]));
      }

      yield put(actions.requestStashSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Request failed for an unspecified reason!');
    }
  } catch (error) {
    // eslint-disable-next-line
    console.dir(error);
    yield put(actions.requestStashFailure(error));
  }
}

function* addStashWorker({ flavor }) {
  try {
    let user = yield select(getUser);

    if (user === null) {
      yield put(appActions.requestCurrentUser());
      yield take([
        appTypes.REQUEST_CURRENT_USER_SUCCESS,
        appTypes.REQUEST_CURRENT_USER_FAILURE
      ]);
      user = yield select(getUser);
    }

    const endpoint = {
      url: `/user/${user.id}/flavor`,
      method: 'POST'
    };

    const data = {
      userId: user.id,
      flavorId: flavor.id
    };

    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.addStashSuccess());
      yield put(
        toastActions.popToast({
          title: 'Stash Update',
          icon: 'times-circle',
          message: `Flavor ID ${flavor.id} successfully added!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to add Flavor ID ${flavor.id} to the Stash!`);
    }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line
    console.dir(error);

    yield put(actions.addStashFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* removeStashWorker({ flavor }) {
  try {
    let user = yield select(getUser);

    if (user === null) {
      yield put(appActions.requestCurrentUser());
      yield take([
        appTypes.REQUEST_CURRENT_USER_SUCCESS,
        appTypes.REQUEST_CURRENT_USER_FAILURE
      ]);
      user = yield select(getUser);
    }

    const endpoint = {
      url: `/user/${user.id}/flavor/${flavor.id}`,
      method: 'DELETE'
    };

    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      yield put(actions.removeStashSuccess());
      yield put(
        toastActions.popToast({
          title: 'Stash Update',
          icon: 'times-circle',
          message: `Flavor ID ${flavor.id} successfully removed!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(
        `Failed to remove Flavor ID ${flavor.id} from the Stash!`
      );
    }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line
    console.dir(error);

    yield put(actions.removeStashFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

export const workers = {
  requestStashWorker,
  addStashWorker,
  removeStashWorker
};

function* requestStashWatcher() {
  yield takeLatest(types.REQUEST_STASH, requestStashWorker);
}

function* addStashWatcher() {
  yield takeLatest(types.ADD_TO_STASH, addStashWorker);
}

function* removeStashWatcher() {
  yield takeLatest(types.REMOVE_FROM_STASH, removeStashWorker);
}

export const watchers = {
  requestStashWatcher,
  addStashWatcher,
  removeStashWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
