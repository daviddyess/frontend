import { all, fork } from 'redux-saga/effects';

import application from './application';
import dashboard from './dashboard';
import flavors from './flavors';
import roles from './roles';
import profile from './profile';
import toast from './toast';
import users from './users';
import vendor from './vendor';
import vendors from './vendors';
import flavor from './flavor';
import recipe from './recipe';

export default function* saga() {
  yield all(
    [
      application,
      dashboard,
      flavor,
      flavors,
      profile,
      recipe,
      roles,
      toast,
      users,
      vendor,
      vendors
    ].map(fork)
  );
}
