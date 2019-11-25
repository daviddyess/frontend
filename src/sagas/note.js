import { all, call, put, takeLatest, select, take } from 'redux-saga/effects';

import request from 'utils/request';
import { getUser } from 'selectors/application';
import { getFlavorNote } from 'selectors/note';
import { actions, types } from 'reducers/note';
import { actions as appActions, types as appTypes } from 'reducers/application';
import { actions as toastActions } from 'reducers/toast';

function* requestNoteWorker({ note }) {
  try {
    const { flavorId } = note;
    const collection = yield select(getFlavorNote);

    if (collection.user[flavorId]) {
      return true;
    }

    let userId = null;

    if (!note.userId) {
      let user = yield select(getUser);

      if (user === null) {
        yield put(appActions.requestCurrentUser());
        yield take([
          appTypes.REQUEST_CURRENT_USER_SUCCESS,
          appTypes.REQUEST_CURRENT_USER_FAILURE
        ]);
        user = yield select(getUser);
      }

      userId = user.id;
    } else {
      userId = note.userId;
    }

    const endpoint = {
      url: `/user/${userId}/note/${flavorId}`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      const { data } = result.response;

      collection.user[flavorId] = false;

      if (!data) {
        return yield put(actions.requestNoteSuccess(collection));
      }

      collection.user[flavorId] = data;

      yield put(actions.requestNoteSuccess(collection));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Request failed for an unspecified reason!');
    }
  } catch (error) {
    // eslint-disable-next-line
    console.dir(error);
    yield put(actions.requestNoteFailure(error));
  }
}

function* createNoteWorker({ flavor }) {
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
      yield put(actions.createNoteSuccess());
      yield put(
        toastActions.popToast({
          title: 'Note Update',
          icon: 'times-circle',
          message: `Flavor ID ${flavor.id} successfully created!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to create Flavor ID ${flavor.id} to the Note!`);
    }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line
    console.dir(error);

    yield put(actions.createNoteFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* deleteNoteWorker({ flavor }) {
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
      yield put(actions.deleteNoteSuccess());
      yield put(
        toastActions.popToast({
          title: 'Note Update',
          icon: 'times-circle',
          message: `Flavor ID ${flavor.id} successfully deleted!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to delete Flavor ID ${flavor.id} from the Note!`);
    }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line
    console.dir(error);

    yield put(actions.deleteNoteFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* updateNoteWorker({ flavor }) {
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
      url: `/user/${user.id}/flavor/${flavor.flavorId}`,
      method: 'PUT'
    };

    const data = {
      minMillipercent: flavor.minMillipercent * 1000,
      maxMillipercent: flavor.maxMillipercent * 1000
    };

    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.updateNoteSuccess());
      yield put(
        toastActions.popToast({
          title: 'Note Update',
          icon: 'times-circle',
          message: `Flavor ID ${flavor.flavorId} successfully updated!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to update Note Flavor ID ${flavor.flavorId}!`);
    }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line
    console.dir(error);

    yield put(actions.updateNoteFailure(error));
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
  requestNoteWorker,
  createNoteWorker,
  deleteNoteWorker,
  updateNoteWorker
};

function* requestNoteWatcher() {
  yield takeLatest(types.REQUEST_NOTE, requestNoteWorker);
}

function* createNoteWatcher() {
  yield takeLatest(types.CREATE_NOTE, createNoteWorker);
}

function* deleteNoteWatcher() {
  yield takeLatest(types.DELETE_NOTE, deleteNoteWorker);
}

function* updateNoteWatcher() {
  yield takeLatest(types.UPDATE_NOTE, updateNoteWorker);
}

export const watchers = {
  requestNoteWatcher,
  createNoteWatcher,
  deleteNoteWatcher,
  updateNoteWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
