import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { getCurrentUserProfile } from 'selectors/profile';
import { getUser } from 'selectors/application';
import { actions, types } from 'reducers/profile';
import { actions as toastActions } from 'reducers/toast';

function* requestCurrentUserProfileWorker() {
  try {
    const userId = yield select(getUser);
    const profile = yield select(getCurrentUserProfile);

    if (!profile) {
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

        yield put(actions.requestCurrentUserProfileSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get user profile!');
      }
    } else {
      yield put(actions.requestCurrentUserProfileSuccess(profile));
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestCurrentUserProfileFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestCurrentUserProfileWatcher() {
  yield takeLatest(
    types.REQUEST_CURRENT_USER_PROFILE,
    requestCurrentUserProfileWorker
  );
}

export const workers = {
  requestCurrentUserProfileWorker
};

export const watchers = {
  requestCurrentUserProfileWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
