import MD5 from 'md5.js';
import { all, call, put, take, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { actions, types } from 'reducers/profile';
import { actions as toastActions } from 'reducers/toast';
import { actions as appActions, types as appTypes } from 'reducers/application';
import { getUserMap, getUserProfiles } from 'selectors/profile';
import { getUser } from 'selectors/application';

function* requestProfileWorker({ user }) {
  try {
    const profile = yield select(getUserProfiles);

    if (user.name && !user.id) {
      const userNames = yield select(getUserMap);

      if (!userNames[user.name]) {
        const endpoint = {
          url: `/user/${user.name}`,
          method: 'GET'
        };
        const result = yield call(request.execute, { endpoint });

        // update profile in state or throw an error
        if (result.success) {
          const {
            response: { data }
          } = result;

          // eslint-disable-next-line no-console
          console.log(JSON.stringify(data));
          profile[data.userId] = {
            name: data.name,
            location: data.location,
            bio: data.bio,
            url: data.url,
            gravatar: new MD5().update(data.User.emailAddress).digest('hex')
          };
          userNames[user.name] = {
            userId: data.userId
          };
          user = {
            ...user,
            id: data.userId
          };
          yield put(
            actions.requestProfileSuccess({
              request: profile[data.userId],
              cache: profile
            })
          );
          yield put(actions.mapUser(userNames));
        } else if (result.error) {
          throw result.error;
        } else {
          throw new Error('Failed to get user profile by username!');
        }
      } else {
        user = {
          ...user,
          id: userNames[user.name].userId
        };
      }
    }

    if (!profile[user.id]) {
      const endpoint = {
        url: `/user/${user.id}/profile`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update profile in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        data.gravatar = new MD5().update(user.email).digest('hex');
        profile[user.id] = data;

        yield put(
          actions.requestProfileSuccess({ request: data, cache: profile })
        );
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get user profile!');
      }
    } else {
      yield put(
        actions.requestProfileSuccess({
          request: profile[user.id],
          cache: profile
        })
      );
    }
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
        throw new Error('Received invalid response to current user request!');
      }
    }

    yield put(
      actions.requestProfile({
        id: user.id,
        email: user.emailAddress
      })
    );
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
