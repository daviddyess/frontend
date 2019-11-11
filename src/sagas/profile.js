import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { actions, types } from 'reducers/profile';
import { actions as toastActions } from 'reducers/toast';
import { actions as appActions } from 'reducers/application';
// import { getUserProfiles } from 'selectors/profile';
import { getUser } from 'selectors/application';

function* requestProfileWorker({ userId }) {
  try {
    // const profile = yield select(getUserProfiles);

    // if (!profile[userId]) {
    const endpoint = {
      url: `/user/${userId}/profile`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update user in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestProfileSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get user profile!');
    }
    // } else {
    //  yield put(actions.requestProfileSuccess(profile));
    // }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestProfileFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestCurrentUserProfileWorker() {
  try {
    const userId = yield put(appActions.requestCurrentUser());

    // const profile = yield select(getUserProfiles);

    // if (!profile[userId.id]) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(userId));
    yield call(actions.requestProfile(userId.id));
    // } else {
    // throw new Error('Failed to get current user profile!');
    // }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line no-console
    console.log(message);

    yield put(actions.requestProfileFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* updateProfileWorker({ profile }) {
  try {
    const userId = yield select(getUser);

    const endpoint = {
      url: `/user/${userId}/profile`,
      method: 'PUT'
    };
    const result = yield call(request.execute, { endpoint, profile });

    // update user in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.updateProfileSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to update user profile!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.updateProfileFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestProfileWatcher() {
  yield takeLatest(types.REQUEST_PROFILE, requestProfileWorker);
}

function* requestCurrentUserProfileWatcher() {
  yield takeLatest(
    types.REQUEST_CURRENT_USER_PROFILE,
    requestCurrentUserProfileWorker
  );
}

function* updateProfileWatcher() {
  yield takeLatest(types.UPDATE_PROFILE, updateProfileWorker);
}

export const workers = {
  requestProfileWorker,
  requestCurrentUserProfileWorker,
  updateProfileWorker
};

export const watchers = {
  requestProfileWatcher,
  requestCurrentUserProfileWatcher,
  updateProfileWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
