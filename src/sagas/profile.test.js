import { all, put, call, select } from 'redux-saga/effects';
import MD5 from 'md5.js';
import request from 'utils/request';
import { actions } from 'reducers/profile';
// import { actions as toastActions } from 'reducers/toast';
import saga, { getCurrentUser, watchers, workers } from './profile';
import { getUserMap, getUserProfiles } from 'selectors/profile';
// import { getUser } from 'selectors/application';

describe('Profile sagas', () => {
  const user = {
    name: 'mixn',
    currentUser: true
  };

  const data = {
    userId: 3,
    name: 'mixn',
    bio: 'testing',
    location: 'testing, pl',
    url: 'test.com',
    User: { emailAddress: 'd@d.com' }
  };

  const profile = {
    name: 'mixn',
    bio: 'testing',
    location: 'testing, pl',
    url: 'test.com',
    gravatar: new MD5().update('d@d.com').digest('hex')
  };

  /* const profiles = [
    {
      userId: 1
    },
    {
      userId: 2
    },
    {
      userId: 3
    }
  ];*/

  const usernameEndpoint = {
    url: `/user/mixn`,
    method: 'GET'
  };

  /* const profileEndpoint = {
    url: `/user/3/profile`,
    method: 'GET'
  };*/

  const map = [
    { user1: { userId: 1 } },
    { user2: { userId: 2 } },
    { mixn: { userId: 3 } }
  ];

  it('handles success in requestProfileWorker', () => {
    const gen = workers.requestProfileWorker({ user });

    let result = gen.next(user);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(select(getUserProfiles));

    result = gen.next(map);

    expect(result.value).toEqual(select(getUserMap));

    result = gen.next(map);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: usernameEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data
      }
    });

    expect(result.value).toEqual(
      put(
        actions.requestProfileSuccess({
          request: profile,
          cache: map,
          currentUser: true
        })
      )
    );
  });

  it('forks all watchers', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map(watcher => watcher()))
    );
  });
});
