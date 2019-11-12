import MD5 from 'md5.js';
import { all, call, put, take, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { actions, types } from 'reducers/profile';
import { actions as toastActions } from 'reducers/toast';
import { actions as appActions, types as appTypes } from 'reducers/application';
// import { getUserProfiles } from 'selectors/profile';
import { getUser } from 'selectors/application';

function* requestProfileWorker({ user }) {
  try {
    // const profile = yield select(getUserProfiles);

    // if (!profile[userId]) {
    const endpoint = {
      url: `/user/${user.id}/profile`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update user in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      data.gravatar = new MD5().update(user.email).digest('hex');

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
    // eslint-disable-next-line no-console
    console.log('IN THE SAGA');
    // const userId = yield put(appActions.requestCurrentUser());

    // const profile = yield select(getUserProfiles);

    let user = yield select(getUser);

    if (!user) {
      yield put(appActions.requestCurrentUser());
      const currentUserResult = yield take([
        appTypes.REQUEST_CURRENT_USER_SUCCESS,
        appTypes.REQUEST_CURRENT_USER_FAILURE
      ]);

      if (currentUserResult.type === appTypes.REQUEST_CURRENT_USER_FAILURE) {
        throw new Error('Failed to fetch current user!');
      }

      user = currentUserResult.user;

      if (!user) {
        throw new Error('Got invalid response to current user request!');
      }
    }

    // if (!profile[userId.id]) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(user));
    yield put(
      actions.requestProfile({ id: user.id, email: user.emailAddress })
    );
    // } else {
    // throw new Error('Failed to get current user profile!');
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
